<template lang="pug">
v-btn(@click="execute") {{ labels.button }}
</template>

<script lang="ts">
import Vue from 'vue';
import Swal from 'sweetalert2';
import * as R from 'ramda';
import * as ModuleFileHandle from '../../store/ModuleFileHandle';
import * as ModuleContentType from '../../store/ModuleContentType';
import * as messages from '../../util/messages';

export default Vue.extend({
  name: 'LoadButton',
  props: ['suggestSaveFunction'],
  data: () => ({
    labels: {
      button: 'Load',
    },
  }),
  methods: {
    execute() {
      R.pipeWith(R.andThen, [
        this.suggestSaveFunction,
        this.showSelectXmlDialog,
        this.setFileHandlerIfXml,
        this.openLoadingDialog,
        this.setContentType,
      ])()
        .then(() => {
          setTimeout(this.closeLoadingDialog, 500);
        })
        .catch((error: Error) => {
          error.message && Swal.fire({ icon: 'error', text: error.message });
        });
    },

    async showSelectXmlDialog() {
      const result = await Swal.fire({
        text: messages.dialog.selectXml,
        showCancelButton: true,
      });
      if (!result.isConfirmed) {
        throw new Error('');
      }
    },

    async setFileHandlerIfXml() {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      if (fileHandle.kind === 'file' && file.type === 'text/xml') {
        ModuleFileHandle.setFileHandle(this.$store, fileHandle);
      } else {
        throw new Error(messages.error.fileNotXml);
      }
      return file;
    },

    async openLoadingDialog(file: File) {
      Swal.fire({
        // @ts-ignore
        iconHtml: `<img class="loading-icon" src="${CONFIG.loadingIcon}">`,
        customClass: { icon: 'no-border' },
        icon: 'warning',
        text: messages.dialog.loading,
        showConfirmButton: false,
      });

      return file;
    },

    async setContentType(file: File) {
      const contentTypeXmlString = await file.text();

      ModuleContentType.setContentTypeFromXmlString(
        this.$store,
        contentTypeXmlString,
      );
    },

    closeLoadingDialog() {
      const contentTypeDisplayName = ModuleContentType.getContentTypeDisplayName(this.$store);

      if (contentTypeDisplayName) {
        Swal.close();
        return;
      }

      setTimeout(this.closeLoadingDialog, 500);
    },
  },
});
</script>

<style lang="scss"></style>
