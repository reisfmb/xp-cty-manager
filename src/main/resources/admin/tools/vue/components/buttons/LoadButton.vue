<template lang="pug">
v-btn(@click="execute") {{ labels.button }}
</template>

<script lang="ts">
import Vue from "vue";
import * as R from "ramda";
import Swal from "sweetalert2";
import * as ModuleFileHandle from "../../store/ModuleFileHandle";
import * as ModuleContentType from "../../store/ModuleContentType";
import * as messages from "../../util/messages";

export default Vue.extend({
  name: "LoadButton",

  data: () => ({
    labels: {
      button: "Load",
    },
  }),

  methods: {
    execute() {
      R.pipeWith(R.andThen, [
        this.showSelectXmlDialog,
        this.setFileHandlerIfXml,
        this.setContentType,
      ])().catch((error: Error) => {
        Swal.fire({ icon: "error", text: error.message });
      });
    },

    async showSelectXmlDialog() {
      const result = await Swal.fire({
        text: messages.dialog.selectXml,
        showCancelButton: true,
      });
      if (!result.isConfirmed) {
        throw new Error(messages.error.selectXml);
      }
    },

    async setFileHandlerIfXml() {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      if (fileHandle.kind === "file" && file.type === "text/xml") {
        ModuleFileHandle.setFileHandle(this.$store, fileHandle);
      } else {
        throw new Error(messages.error.fileNotXml);
      }
      return file;
    },

    async setContentType(file: File) {
      const contentTypeXmlString = await file.text();
      ModuleContentType.setContentTypeFromXmlString(
        this.$store,
        contentTypeXmlString
      );
    },
  },
});
</script>

<style lang="scss"></style>
