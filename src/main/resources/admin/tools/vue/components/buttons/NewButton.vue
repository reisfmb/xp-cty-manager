<template lang="pug">
v-btn(data-testid="v-btn__new", @click="execute") {{ labels.button }}
</template>

<script lang="ts">
import Vue from 'vue';
import Swal from 'sweetalert2';
import * as R from 'ramda';
import * as ModuleFileHandle from '../../store/ModuleFileHandle';
import * as ModuleContentType from '../../store/ModuleContentType';
import * as messages from '../../util/messages';

export default Vue.extend({
  name: 'NewButton',
  props: ['suggestSaveFunction'],
  data: () => ({
    labels: {
      button: 'New',
    },
  }),
  methods: {
    execute() {
      if (!this.checkBroswerCompatibility()) {
        this.showBrowserIncompatibilityDialog();
        return;
      }

      this.suggestSaveFunction()
        .then(() => {
          R.pipe(this.resetFileHandle, this.resetContentType)();
        })
        .catch((error: Error) => {
          error.message && Swal.fire({ icon: 'error', text: error.message });
        });
    },

    checkBroswerCompatibility() {
      const keys = Object.keys(window);
      return keys.includes('showDirectoryPicker') && keys.includes('showOpenFilePicker');
    },

    resetFileHandle() {
      ModuleFileHandle.resetFileHandle(this.$store);
    },

    resetContentType() {
      ModuleContentType.resetContentType(this.$store);
    },

    showBrowserIncompatibilityDialog() {
      Swal.fire({
        text: messages.error.incompatibleBrowser,
        icon: 'warning',
      });
    },
  },
});
</script>

<style lang="scss"></style>
