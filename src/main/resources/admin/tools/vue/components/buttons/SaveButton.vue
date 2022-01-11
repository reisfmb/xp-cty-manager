<template lang="pug">
v-btn#saveButton(
  @click="execute",
  color="green",
  :disabled="isContentTypeEmpty"
) {{ labels.button }}
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";
import * as R from "ramda";
import * as ModuleFileHandle from "../../store/ModuleFileHandle";
import * as ModuleContentType from "../../store/ModuleContentType";
import * as messages from "../../util/messages";
import * as helpers from "../../util/helpers";

export default Vue.extend({
  name: "SaveButton",

  data: () => ({
    labels: {
      button: "Save",
    },
  }),

  methods: {
    async execute(): Promise<void> {
      this.resetColorOfVcards();

      // Validate
      if (!this.validateForm()) {
        this.setBorderOfVcardsWithErrors();

        Swal.fire({ icon: "error", text: messages.error.saveXml });
        return;
      }

      // Save or create then save
      (this.fileHandle ? this.save() : this.create().then(() => this.save()))
        .then(() => {
          Swal.fire({
            icon: "success",
            text: messages.dialog.savedCty,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error: Error) => {
          error.message && Swal.fire({ icon: "error", text: error.message });
        });
    },

    async save(): Promise<void> {
      if (!this.fileHandle) {
        return;
      }

      const writable = await this.fileHandle.createWritable();
      const ctyAsXmlString = this.getContentTypeAsXmlString();

      if (ctyAsXmlString && writable) {
        await writable.write(ctyAsXmlString);
        await writable.close();
        ModuleContentType.setContentTypeAfterLastSave(this.$store);
      } else {
        throw new Error(messages.error.saveXml);
      }
    },

    async create(): Promise<void> {
      // 1 - Select folder
      async function showFirstDialog() {
        return Swal.fire({
          text: messages.dialog.selectCtyFolder,
          showCancelButton: true,
        }).then(async (result) => {
          if (!result.isConfirmed) {
            throw new Error("");
          }
        });
      }

      // 2 - Validate if selected folder is called 'content-types'
      async function selectFolder() {
        const dirHandle = await window.showDirectoryPicker();
        if (dirHandle.name !== "content-types") {
          throw new Error(messages.error.folderNotCty(dirHandle.name));
        }
        return dirHandle;
      }

      // 3 - Check if the name of the new content type is valid
      const getValidCtyName = (async (
        dirHandle: FileSystemDirectoryHandle
      ): Promise<{ dirHandle: FileSystemDirectoryHandle; ctyName: string }> => {
        if (!("name" in dirHandle)) {
          throw new Error("");
        }

        let ctyName = "";
        const existingCtyNames = await this.getAllExistingCtynames(dirHandle);

        const isCtyNameValid = (ctyName: string) =>
          ctyName.length > 0 && !ctyName.includes(" ");

        const ctyNameExists = (ctyName: string, existingCtyNames: string[]) =>
          existingCtyNames.indexOf(ctyName) === -1;

        const dialogText = (ctyName: string, existingCtyNames: string[]) => {
          if (!ctyName) return messages.dialog.defineCtyName;

          let errorMessages = [];
          if (!isCtyNameValid(ctyName)) {
            errorMessages.push("is invalid");
          }
          if (!ctyNameExists(ctyName, existingCtyNames)) {
            errorMessages.push("is used by another content type");
          }

          if (errorMessages.length > 0) {
            return `<b>"${ctyName}"</b> ${errorMessages.join(
              " and "
            )}. Please provide a different name.`;
          }
        };

        do {
          const text = dialogText(ctyName, existingCtyNames);
          const r = await Swal.fire({ html: text, input: "text" });
          ctyName = r.value;
        } while (
          !isCtyNameValid(ctyName) ||
          !ctyNameExists(ctyName, existingCtyNames)
        );

        return { dirHandle, ctyName };
      }).bind(this);

      // 4 - Create the directory and the xml files for the content type
      const createDirAndXmlFile = (async (DTO: {
        dirHandle: FileSystemDirectoryHandle;
        ctyName: string;
      }) => {
        const { dirHandle, ctyName } = DTO;

        const newDirHandle = await dirHandle.getDirectoryHandle(ctyName, {
          create: true,
        });

        const fileHandle = await newDirHandle.getFileHandle(`${ctyName}.xml`, {
          create: true,
        });

        ModuleFileHandle.setFileHandle(this.$store, fileHandle);
      }).bind(this);

      ///

      const executeCreate = R.pipeWith(R.andThen, [
        showFirstDialog,
        selectFolder,
        getValidCtyName,
        createDirAndXmlFile,
      ]);

      await executeCreate();
    },

    ///

    getContentTypeAsXmlString() {
      return ModuleContentType.getContentTypeAsXmlString(this.$store);
    },

    validateForm(): boolean {
      const appComponent = this.$root.$children[0] || null;
      if (!appComponent) throw new Error("Missing vue App component.");

      //@ts-ignore
      return appComponent.$refs.form.validate();
    },

    async getAllExistingCtynames(
      dirHandle: FileSystemDirectoryHandle
    ): Promise<string[]> {
      let arr = [];

      for await (const entry of dirHandle.values()) {
        entry.kind === "directory" && arr.push(entry.name);
      }

      return arr;
    },

    setBorderOfVcardsWithErrors() {
      setTimeout(() => {
        const elementsWithErrors = helpers.getAllDOMelementsWithErrors();
        helpers.colorizeElementsWithErrors(elementsWithErrors);
        helpers.expandAllParentElements(elementsWithErrors);
      }, 100);
    },

    resetColorOfVcards() {
      helpers.resetVCardErrorClass();
    },
  },

  computed: {
    fileHandle() {
      return ModuleFileHandle.getFileHandle(this.$store);
    },
    isContentTypeEmpty() {
      return ModuleContentType.isContentTypeEmpty(this.$store);
    },
  },
});
</script>

<style lang="scss"></style>
