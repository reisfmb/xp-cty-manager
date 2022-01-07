<template lang="pug">
v-btn(@click="execute") {{ labels.button }}
</template>

<script lang="ts">
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
