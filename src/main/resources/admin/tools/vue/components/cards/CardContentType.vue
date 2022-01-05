<template lang="pug">
v-card
  v-card-title {{ fileName }}
  v-card-text
    RecursiveComponentRender(:path="path")
    CardMultipleTextInput(
      :path="elementsPath",
      :pathToText="['elements', 0, 'text']",
      elementName="allow-child-content-type",
      buttonAddLabel="Add Allow Child Content Type"
    )
    CardMultipleTextInput(
      :path="elementsPath",
      :pathToText="['attributes', 'name']",
      elementName="x-data",
      buttonAddLabel="Add X-Data"
    )
    CardForm(:path="formPath")
</template>

<script lang="ts">
import Vue from "vue";
import * as ModuleContentType from "../../store/ModuleContentType";
import * as ModuleFileHandle from "../../store/ModuleFileHandle";
import { Element } from "@reginaldlee/xml-js";
import CardMultipleTextInput from "./CardMultipleTextInput.vue";
import CardForm from "./CardForm.vue";

export default Vue.extend({
  name: "CardContentType",
  components: { CardMultipleTextInput, CardForm },
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
    formPath(): (string | number)[] {
      const elements = ModuleContentType.getContentTypeByPath(this.$store)(
        this.elementsPath
      ) as Array<Element>;

      const formIndexInElements = elements.findIndex(
        (el: Element) => el.name === "form"
      );

      return formIndexInElements >= 0
        ? [...this.elementsPath, formIndexInElements]
        : [];
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
