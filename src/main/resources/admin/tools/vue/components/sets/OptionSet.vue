<template lang="pug">
v-card
  .row.pointer(@click="show = !show")
    v-col(cols="9")
      v-card-title {{ setName }}
      v-card-subtitle
        a(:href="docsUrl", target="_blank", @click.stop) {{ setTypeBeautified }}

    v-col.d-flex.align-center.justify-end(cols="3")
      ElementButtons(:path="path")

  transition(name="fade")
    v-card-text(v-show="show")
      TextAttributeInput(
        :path="path",
        :attributes="['name']",
        :rules="['requiredText', 'noSpaces']"
      )
      RecursiveComponentRender(:path="path")
      CardOptions(:path="optionsPath")
</template>

<script lang="ts">
import Vue from "vue";
import * as ModuleContentType from "../../store/ModuleContentType";
import ElementButtons from "../buttons/ElementButtons.vue";
import TextAttributeInput from "../inputs/TextAttributeInput.vue";
import CardOptions from "../cards/CardOptions.vue";
import { Element } from "@reginaldlee/xml-js";

export default Vue.extend({
  name: "OptionSet",
  components: { CardOptions, TextAttributeInput, ElementButtons },
  props: {
    path: Array,
    field: Object, // label, hint
  },
  data: () => ({
    show: false,
  }),
  beforeCreate() {
    ((this.$options || {}).components || {}).RecursiveComponentRender =
      require("../RecursiveComponentRender.vue").default;
  },
  created() {},
  methods: {},
  computed: {
    elementsPath(): string[] {
      return [...(this.path as string[]), "elements"];
    },
    setName(): string {
      const path = [...this.path, "attributes", "name"] as string[];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || "";
    },
    setType(): string {
      const path = [...this.path, "name"] as string[];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || "";
    },
    setTypeBeautified(): string {
      return this.setType
        .split("-")
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join("");
    },
    optionsPath(): (string | number)[] {
      const elements = ModuleContentType.getContentTypeByPath(this.$store)(
        this.elementsPath
      ) as Array<Element>;

      const optionsIndexInElements = elements.findIndex(
        (el: Element) => el.name === "options"
      );

      return optionsIndexInElements >= 0
        ? [...this.elementsPath, optionsIndexInElements]
        : [];
    },
    docsUrl(): string {
      const setType = this.setType.replace("-", "_").toLowerCase();
      return `https://developer.enonic.com/docs/xp/stable/cms/sets#${setType}`;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
