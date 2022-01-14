<template lang="pug">
transition(name="fade")
  v-card(v-show="showOnMounted")
    v-card-title {{ contentTypeDisplayName }}
    v-card-text
      v-card.mt-0
        v-card-title.pointer(@click="show = !show")
          span Content Type
          v-icon {{ show ? 'mdi-menu-down' : 'mdi-menu-up' }}
        transition(name="fade")
          v-card-text(v-show="show")
            RecursiveComponentRender(:path="path")
            TextMultipleInput(
              :path="elementsPath",
              :pathToText="['elements', 0, 'text']",
              elementName="allow-child-content-type",
              buttonAddLabel="Add Allow Child Content Type"
            )
            TextMultipleInput(
              :path="elementsPath",
              :pathToText="['attributes', 'name']",
              elementName="x-data",
              buttonAddLabel="Add X-Data"
            )
      CardForm(:path="formPath")
</template>

<script lang="ts">
import Vue from 'vue';
import { Element } from '@reginaldlee/xml-js';
import * as ModuleContentType from '../../store/ModuleContentType';
import TextMultipleInput from '../inputs/TextMultipleInput.vue';
import CardForm from './CardForm.vue';

export default Vue.extend({
  name: 'CardContentType',
  components: { TextMultipleInput, CardForm },
  props: { path: Array },
  data: () => ({
    showOnMounted: false,
    show: false,
    fileName: '',
  }),
  beforeCreate() {
    ((this.$options || {}).components || {}).RecursiveComponentRender = require('../RecursiveComponentRender.vue').default;
  },
  mounted() {
    this.showOnMounted = true;
    if (!this.contentTypeDisplayName) this.show = true;
  },
  computed: {
    elementsPath(): string[] {
      return [...(this.path as string[]), 'elements'];
    },
    formPath(): (string | number)[] {
      const elements = ModuleContentType.getContentTypeByPath(this.$store)(
        this.elementsPath,
      ) as Array<Element>;

      const formIndexInElements = elements.findIndex(
        (el: Element) => el.name === 'form',
      );

      return formIndexInElements >= 0
        ? [...this.elementsPath, formIndexInElements]
        : [];
    },
    contentTypeDisplayName(): string | null {
      return ModuleContentType.getContentTypeDisplayName(this.$store);
    },
  },
});
</script>

<style lang="scss" scoped>
i {
  margin-left: auto;
}
</style>
