<template lang="pug">
v-card
  .row(@click="show = !show")
    v-col(cols="9")
      v-card-title {{ optionName }}
      v-card-subtitle {{ optionType }}

    v-col.d-flex.align-center.justify-end(cols="3")
      ElementButtons(:path="path")

  v-card-text(v-show="show")
    TextAttributeInput(
      :path="path",
      :attributes="['name']",
      :rules="['requiredText', 'noSpaces']"
    )
    RecursiveComponentRender(:path="path")
    CardItems(:path="itemsPath")
</template>

<script lang="ts">
import Vue from "vue";
import { Element } from "@reginaldlee/xml-js";
import * as ModuleContentType from "../../store/ModuleContentType";
import ElementButtons from "../buttons/ElementButtons.vue";
import RecursiveComponentRender from "../RecursiveComponentRender.vue";
import TextAttributeInput from "../inputs/TextAttributeInput.vue";
import CardItems from "../cards/CardItems.vue";

export default Vue.extend({
  name: "CardOption",
  components: {
    ElementButtons,
    RecursiveComponentRender,
    TextAttributeInput,
    CardItems,
  },
  props: {
    path: Array,
  },
  data: () => ({
    show: false,
  }),
  computed: {
    optionName(): string {
      const path = [...this.path, "attributes", "name"] as string[];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || "";
    },
    optionType(): string {
      return "option";
    },
    elementsPath(): string[] {
      return [...(this.path as string[]), "elements"];
    },
    itemsPath(): (string | number)[] {
      const elements = ModuleContentType.getContentTypeByPath(this.$store)(
        this.elementsPath
      ) as Array<Element>;

      const itemsIndexInElements = elements.findIndex(
        (el: Element) => el.name === "items"
      );

      return itemsIndexInElements >= 0
        ? [...this.elementsPath, itemsIndexInElements]
        : [];
    },
  },
});
</script>

<style lang="scss"></style>
