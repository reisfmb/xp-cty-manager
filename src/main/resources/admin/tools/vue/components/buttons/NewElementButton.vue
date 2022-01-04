<template lang="pug">
div
  v-autocomplete(
    v-model="states.option",
    :items="filteredOptionsKeys",
    :label="autocomplete.label",
    :prepend-inner-icon="autocomplete.icon"
  )
  v-btn(@click="execute", :disabled="!states.option") {{ button.label }}
</template>

<script lang="ts">
import Vue from "vue";
import * as R from "ramda";
import { Element, ElementCompact } from "@reginaldlee/xml-js";
import RawSchemas from "../../util/rawSchemas";
import * as ModuleContentType from "../../store/ModuleContentType";

export default Vue.extend({
  name: "NewElementButton",
  props: {
    path: Array,
    show: Array,
    hide: Array,
  },
  data: () => ({
    options: {} as { [key: string]: Element | ElementCompact },
    states: { option: "" },
    autocomplete: { label: "Select element", icon: "mdi-xml" },
    button: { label: "Add" },
  }),
  mounted() {
    this.options = R.omit(["content-type"], RawSchemas);
  },
  methods: {
    execute() {
      console.log(this.elementsPath, this.elements);
      const updatedElements = [
        ...Array.from(this.elements),
        this.getElement(),
      ] as Array<Element>;

      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.elementsPath,
        value: updatedElements,
      });
    },

    getElement(): Element | null {
      return (
        R.view(
          R.lensPath(["elements", 0]),
          this.filteredOptions[this.states.option]
        ) || null
      );
    },
  },
  computed: {
    elementsPath(): string[] {
      return [...(this.path as string[]), "elements"];
    },
    elements(): Array<Element> {
      return (
        ModuleContentType.getContentTypeByPath(this.$store)(
          this.elementsPath
        ) || []
      );
    },
    filteredOptions(): { [key: string]: Element | ElementCompact } {
      const show = (this.show || Object.keys(this.options)) as string[];
      const hide = (this.hide || []) as string[];
      return R.pick(show, R.omit(hide, RawSchemas));
    },
    filteredOptionsKeys(): string[] {
      return Object.keys(this.filteredOptions).sort((a, b) =>
        a.localeCompare(b)
      );
    },
  },
});
</script>

<style lang="scss"></style>
