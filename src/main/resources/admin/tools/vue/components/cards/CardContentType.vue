<template lang="pug">
v-card
  v-card-title {{ fileName }}
  v-card-text
    RecursiveComponentRender(:path="path")
    CardMultipleTextInput(
      :path="elementsPath",
      :pathToValue="['elements', '0', 'text']",
      elementName="allow-child-content-type",
      buttonAddLabel="Add Allow Child Content Type"
    )
    CardMultipleTextInput(
      :path="elementsPath",
      :pathToValue="['attributes', 'name']",
      elementName="x-data",
      buttonAddLabel="Add X-Data"
    )
</template>

<script lang="ts">
import Vue from "vue";
import * as ModuleFileHandle from "../../store/ModuleFileHandle";
import CardMultipleTextInput from "./CardMultipleTextInput.vue";

export default Vue.extend({
  name: "CardContentType",
  components: { CardMultipleTextInput },
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
    elementsPath(): string[] {
      return [...(this.path as string[]), "elements"];
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
