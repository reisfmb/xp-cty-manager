<template lang="pug">
.my-5
  v-card.my-5(v-for="(item, index) in states.array")
    v-card-subtitle
      v-row
        v-col(:cols="pathToAttributes ? '5' : '10'")
          v-text-field(
            @change="setVModel($event, index, 'text')",
            :value="getVModel(index, 'text')",
            :label="getFieldLabel()",
            :rules="[]"
          )
        v-col(cols="5", v-if="pathToAttributes")
          v-text-field(
            @change="setVModel($event, index, 'attributes')",
            :value="getVModel(index, 'attributes')",
            label="Value",
            :rules="[]"
          )
        v-col(cols="2")
          v-btn(@click="remove(index)", icon)
            v-icon {{ buttons.remove.icon }}

  v-btn.my-5(@click="add") {{ buttonAddLabel }}
</template>

<script lang="ts">
// TODO: Add rules

import Vue from "vue";
import * as R from "ramda";
import * as ModuleContentType from "../../store/ModuleContentType";
import { Element } from "@reginaldlee/xml-js";

export default Vue.extend({
  name: "TextMultipleInput",
  props: {
    path: Array,
    pathToText: Array,
    pathToAttributes: Array,
    elementName: String,
    buttonAddLabel: String,
  },
  data: () => ({
    states: { array: [] as Array<Element> },
    buttons: {
      remove: { icon: "mdi-delete-circle-outline" },
    },
  }),
  mounted() {
    this.states.array = this.elementsOfInterest;
  },
  watch: {
    elementsOfInterest() {
      this.states.array = this.elementsOfInterest;
    },
  },
  methods: {
    save() {
      const updatedElements = [...this.remainingElements, ...this.states.array];

      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.path as string[],
        value: updatedElements,
      });
    },
    add() {
      let objToBeAdded = {
        type: "element",
        name: this.elementName,
      } as Element;

      if (this.pathToText) {
        objToBeAdded = R.set(
          R.lensPath(this.pathToText as string[]),
          "",
          objToBeAdded
        );
      }

      if (objToBeAdded.elements) {
        objToBeAdded = R.set(
          R.lensPath(["elements", 0, "type"]),
          "text",
          objToBeAdded
        );
      }

      if (this.pathToAttributes) {
        objToBeAdded = R.set(
          R.lensPath(this.pathToAttributes as string[]),
          "",
          objToBeAdded
        );
      }

      this.states.array = [...this.states.array, objToBeAdded];

      this.save();
    },
    remove(index: number) {
      this.states.array = R.remove(index, 1, this.states.array);

      this.save();
    },

    setLens(type: "text" | "attributes") {
      let lens = R.lensPath(this.pathToText as string[]);

      if (type === "attributes") {
        lens = R.lensPath(this.pathToAttributes as string[]);
      }

      return lens;
    },
    getVModel(index: number, type: "text" | "attributes"): string {
      const lens = this.setLens(type);

      return R.view(lens, this.states.array[index]) as string;
    },
    setVModel(value: string, index: number, type: "text" | "attributes"): void {
      const lens = this.setLens(type);

      this.states.array[index] = R.set(lens, value, this.states.array[index]);

      this.save();
    },

    getFieldLabel(): string {
      const capitalize = R.replace(/^./, R.toUpper);
      return this.elementName
        .split("-")
        .map((s) => capitalize(s))
        .join(" ");
    },
  },
  computed: {
    elements(): Array<Element> {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.path as string[]
      );
    },
    elementsOfInterest(): Array<Element> {
      const f = (element: Element) => element.name === this.elementName;
      return R.filter(f, this.elements);
    },
    remainingElements(): Array<Element> {
      const f = (element: Element) => element.name !== this.elementName;
      return R.filter(f, this.elements);
    },
  },
});
</script>

<style lang="scss"></style>
