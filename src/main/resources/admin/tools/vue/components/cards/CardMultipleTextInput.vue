<template lang="pug">
.my-5
  v-card.my-5(v-for="(item, index) in states.array")
    v-row
      v-col(cols="10")
        v-card-subtitle
          v-text-field(
            @change="setVModel($event, index)",
            :value="getVModel(index)",
            :label="getFieldLabel()",
            :rules="[]"
          )

      v-col(cols="2")
        v-btn(@click="remove(index)", icon)
          v-icon {{ buttons.remove.icon }}

  v-btn.my-5(@click="add") {{ buttonAddLabel }}
</template>

<script lang="ts">
import Vue from "vue";
import * as R from "ramda";
import * as ModuleContentType from "../../store/ModuleContentType";
import { Element } from "@reginaldlee/xml-js";

export default Vue.extend({
  name: "CardMultipleTextInput",
  props: {
    path: Array,
    pathToValue: Array,
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

      objToBeAdded = R.set(
        R.lensPath(this.pathToValue as string[]),
        "",
        objToBeAdded
      );

      if (objToBeAdded.elements) {
        objToBeAdded = R.set(
          R.lensPath(["elements", "0", "type"]),
          "text",
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

    getVModel(index: number): string {
      return R.view(
        R.lensPath(this.pathToValue as string[]),
        this.states.array[index]
      ) as string;
    },
    setVModel(value: string, index: number): void {
      this.states.array[index] = R.set(
        R.lensPath(this.pathToValue as string[]),
        value,
        this.states.array[index]
      );

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
