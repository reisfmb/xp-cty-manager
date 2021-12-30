<template lang="pug">
v-card
  v-card-title {{ fileName }}
  v-card-text
    RecursiveComponentRender(:path="path")
</template>

<script lang="ts">
import Vue from "vue";
import { Element } from "@reginaldlee/xml-js";
import * as ModuleContentType from "../../store/ModuleContentType";
import * as ModuleFileHandle from "../../store/ModuleFileHandle";

export default Vue.extend({
  name: "CardContentType",
  props: { path: Array },
  data: () => ({
    fileName: "",
  }),
  beforeCreate() {
    ((this.$options || {}).components || {}).RecursiveComponentRender =
      require("../RecursiveComponentRender.vue").default;
  },
  created() {
    this.setFileName();
  },
  methods: {
    setFileName() {
      ModuleFileHandle.getFileName(this.$store).then(
        (fn) => (this.fileName = fn || "")
      );
    },
  },
  computed: {
    elements(): Element[] | null {
      const path = [...(this.path as string[]), "elements"];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || null;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
