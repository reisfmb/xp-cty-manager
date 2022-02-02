<template lang="pug">
div(v-if="elements")
  component(
    v-for="(element, index) in elements",
    v-if="getComponentName(element.name)",
    :is="getComponentName(element.name)",
    v-bind="getComponentProps(element.name, index)"
  )

  div(v-if="inputType === 'ComboBox' || inputType === 'RadioButton'")
    TextMultipleInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', 0, 'text']",
      :pathToAttributes="['attributes', 'value']",
      elementName="option",
      buttonAddLabel="Add Option"
    )

  div(v-if="inputType === 'ContentSelector' || inputType === 'MediaSelector'")
    TextMultipleInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', 0, 'text']",
      elementName="allowContentType",
      buttonAddLabel="Add Allowed Content Type"
    )
    TextMultipleInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', 0, 'text']",
      elementName="allowPath",
      buttonAddLabel="Add Allowed Path"
    )

  div(v-if="inputType === 'CustomSelector'")
    TextMultipleInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', 0, 'text']",
      :pathToAttributes="['attributes', 'value']",
      elementName="param",
      buttonAddLabel="Add Parameter"
    )

  div(v-if="inputType === 'ImageSelector'")
    TextMultipleInput(
      :path="getPathToElementsInConfig()",
      :pathToText="['elements', 0, 'text']",
      elementName="allowPath",
      buttonAddLabel="Add Allowed Path"
    )
</template>

<script lang="ts">
import Vue from 'vue';
import { Element } from '@reginaldlee/xml-js';
import * as R from 'ramda';
import * as ModuleContentType from '../store/ModuleContentType';
import rawSchemas from '../util/rawSchemas';

import TextInput from './inputs/TextInput.vue';
import OptionsInput from './inputs/OptionsInput.vue';
import TextAttributeInput from './inputs/TextAttributeInput.vue';
import BooleanInput from './inputs/BooleanInput.vue';
import CardInput from './cards/CardInput.vue';
import CardMixin from './cards/CardMixin.vue';
import TextMultipleInput from './inputs/TextMultipleInput.vue';

export default Vue.extend({
  name: 'RecursiveComponentRender',
  components: {
    TextInput,
    OptionsInput,
    TextAttributeInput,
    BooleanInput,
    CardInput,
    CardMixin,
    TextMultipleInput,
  },
  props: { path: Array, show: Boolean },
  data: () => ({
    rawElements: [] as Array<Element>,

    wereFieldsAdjusted: false,
  }),
  beforeCreate() {
    if (this.$options && this.$options.components) {
      this.$options.components.CardContentType = require('./cards/CardContentType.vue').default;
      this.$options.components.FieldOrItemSet = require('./sets/FieldOrItemSet.vue').default;
      this.$options.components.OptionSet = require('./sets/OptionSet.vue').default;
    }
  },
  created() {
    this.populateRawElements();
  },
  watch: {
    show() {
      if (this.show === true && this.wereFieldsAdjusted === false) {
        this.adjustFieldsOfCty();
      }
    },
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
      const props = this.$gf.getComponentProps(elementName);
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
        (el: Element) => el.name === 'config',
      );

      return indexOfConfigInElements >= 0
        ? [...this.elementsPath, indexOfConfigInElements, 'elements']
        : null;
    },
    populateRawElements(): void {
      if (!this.inputType) return;

      const raw = ((rawSchemas as { [key: string]: Element })[this.inputType]
        || {}) as Element;

      this.rawElements = Object.keys(raw)
        ? ((raw.elements || [{ elements: [] }])[0] || {}).elements || []
        : [];
    },

    ///

    adjustFieldsOfCty(): void {
      if (this.inputType && this.elements !== null) {
        this.rawElements.forEach((rawEl: Element, rawIndex: number) => {
          const elIndex = this.elements.findIndex(
            (el: Element) => el.name === rawEl.name,
          );

          if (elIndex >= 0) {
            if (this.rawElements[rawIndex].elements) {
              (this.elements[elIndex].elements || []).forEach((el: Element) => {
                const rawInnerIndex = (
                  this.rawElements[rawIndex].elements || []
                ).findIndex((rawEl: Element) => el.name === rawEl.name);

                if (rawInnerIndex >= 0) {
                  this.rawElements = R.set(
                    R.lensPath([rawIndex, 'elements', rawInnerIndex]),
                    el,
                    this.rawElements,
                  );
                } else {
                  const updatedElements = [
                    ...(this.rawElements[rawIndex].elements || []),
                    el,
                  ];

                  this.rawElements = R.set(
                    R.lensPath([rawIndex, 'elements']),
                    updatedElements,
                    this.rawElements,
                  );
                }
              });
            } else {
              this.rawElements = R.set(
                R.lensIndex(rawIndex),
                this.elements[elIndex],
                this.rawElements,
              );
            }
          }
        });

        this.elements = [...this.rawElements];
        this.wereFieldsAdjusted = true;
      }
    },
  },
  computed: {
    inputType(): string | null {
      const inputTypePath = [...this.path, 'attributes', 'type'] as string[];
      const inputType = ModuleContentType.getContentTypeByPath(this.$store)(
        inputTypePath,
      );
      if (inputType) {
        return inputType;
      }

      const contentTypeNamePath = [...this.path, 'name'] as string[];
      const contentTypeName = ModuleContentType.getContentTypeByPath(
        this.$store,
      )(contentTypeNamePath);
      if (contentTypeName && contentTypeName === 'content-type') {
        return 'ContentType';
      }

      return null;
    },
    elementsPath(): (string | number)[] {
      return [...(this.path as string[]), 'elements'];
    },
    elements: {
      get(): Array<Element> {
        return (
          ModuleContentType.getContentTypeByPath(this.$store)(
            this.elementsPath,
          ) || []
        );
      },
      set(updatedElements: Array<Element>): void {
        ModuleContentType.setContentTypeByPath(this.$store, {
          path: this.elementsPath,
          value: updatedElements,
        });
      },
    },
  },
});
</script>

<style lang="scss"></style>
