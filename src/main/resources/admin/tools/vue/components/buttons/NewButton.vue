<template lang="pug">
div
  button(@click="execute") {{ labels.button }}
</template>

<script lang="ts">
// [ TODO ] - 1. Check browser compatibility // Maybe not here ?
// [ TODO ] - 2. Suggest save if changes exists
// [x] - 3. Reset file handle in the ModuleFileHandle
// [x] - 4. Reset content type in the ModuleContentType

import Vue from "vue";
import * as R from "ramda";
import * as ModuleFileHandle from "../../store/ModuleFileHandle";
import * as ModuleContentType from "../../store/ModuleContentType";

export default Vue.extend({
  name: "NewButton",

  data: () => ({
    labels: {
      button: "New",
    },
  }),

  methods: {
    execute() {
      R.pipe(this.resetFileHandle, this.resetContentType)();
    },

    resetFileHandle() {
      ModuleFileHandle.resetFileHandle(this.$store);
    },

    resetContentType() {
      ModuleContentType.resetContentType(this.$store);
    },
  },
});
</script>

<style lang="scss"></style>
