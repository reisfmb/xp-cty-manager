<template lang="pug">
div(v-if="elements")
  component(
    v-for="(element, index) in elements",
    v-if="getComponentName(element.name)",
    :is="getComponentName(element.name)",
    v-bind="getComponentProps(element.name, index)"
  )

  div(v-if="inputType === 'ComboBox' || inputType === 'RadioButton'")
    CardMultipleTextInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', '0', 'text']",
      :pathToAttributes="['attributes', 'value']",
      elementName="option",
      buttonAddLabel="Add Option"
    )

  div(v-if="inputType === 'ContentSelector' || inputType === 'MediaSelector'")
    CardMultipleTextInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', '0', 'text']",
      elementName="allowContentType",
      buttonAddLabel="Add Allowed Content Type"
    )
    CardMultipleTextInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', '0', 'text']",
      elementName="allowPath",
      buttonAddLabel="Add Allowed Path"
    )

  div(v-if="inputType === 'CustomSelector'")
    CardMultipleTextInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', '0', 'text']",
      :pathToAttributes="['attributes', 'value']",
      elementName="param",
      buttonAddLabel="Add Parameter"
    )

  div(v-if="inputType === 'ImageSelector'")
    CardMultipleTextInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', '0', 'text']",
      elementName="allowPath",
      buttonAddLabel="Add Allowed Path"
    )
</template>

<script lang="ts">
import Vue from "vue";
import { Element } from "@reginaldlee/xml-js";
import * as ModuleContentType from "../store/ModuleContentType";

import TextInput from "./inputs/TextInput.vue";
import TextAttributeInput from "./inputs/TextAttributeInput.vue";
import BooleanInput from "./inputs/BooleanInput.vue";
import CardInput from "./cards/CardInput.vue";
import CardMultipleTextInput from "./cards/CardMultipleTextInput.vue";

export default Vue.extend({
  name: "RecursiveComponentRender",
  components: {
    TextInput,
    TextAttributeInput,
    BooleanInput,
    CardInput,
    CardMultipleTextInput,
  },
  props: { path: Array },
  beforeCreate() {
    ((this.$options || {}).components || {}).CardContentType =
      require("./cards/CardContentType.vue").default;

    ((this.$options || {}).components || {}).FieldOrItemSet =
      require("./sets/FieldOrItemSet.vue").default;
  },
  methods: {
    getComponentName(elementName: string) {
      const props = this.$gf.getComponentProps(elementName);
      if (!props) {
        return null;
      }

      return props.component;
    },
    getComponentProps(elementName: string, index: number) {
      let props = this.$gf.getComponentProps(elementName);
      if (!props) {
        return null;
      }

      props.path = this.$gf.innerPath(this.path as (string | number)[], index);
      return props;
    },

    getPathToElementsInConfig(): (string | number)[] | null {
      if (!this.elements) {
        return null;
      }

      const indexOfConfigInElements = this.elements.findIndex(
        (el: Element) => el.name === "config"
      );

      return indexOfConfigInElements >= 0
        ? [...this.elementsPath, indexOfConfigInElements, "elements"]
        : null;
    },
  },
  computed: {
    elementsPath(): (string | number)[] {
      return [...(this.path as string[]), "elements"];
    },
    elements(): Element[] | null {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.elementsPath
      );
    },
    inputType(): string | null {
      const elementInPath = ModuleContentType.getContentTypeByPath(this.$store)(
        this.path as (string | number)[]
      ) as Element;

      return elementInPath &&
        elementInPath.attributes &&
        elementInPath.attributes.type
        ? elementInPath.attributes.type.toString()
        : null;
    },
  },
});
</script>

<style lang="scss"></style>
