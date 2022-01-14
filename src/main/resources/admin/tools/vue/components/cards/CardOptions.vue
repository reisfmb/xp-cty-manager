<template lang="pug">
div
  CardOption(v-for="(element, index) in options", :path="getOptionPath(index)")
  NewElementButton(:path="path", :show="['Option']")
</template>

<script lang="ts">
// TODO: this.path can be empty if <options> tag wasn't found in the cty xml.
//       If that is the case, there's the need to add a "options" element to the first "elements",
//       rendered by a option-set component.
import Vue from 'vue';
import { Element } from '@reginaldlee/xml-js';
import * as ModuleContentType from '../../store/ModuleContentType';
import CardOption from './CardOption.vue';
import NewElementButton from '../buttons/NewElementButton.vue';

export default Vue.extend({
  name: 'CardOptions',
  components: { NewElementButton, CardOption },
  props: {
    path: Array,
  },
  data: () => ({}),
  mounted() {},
  methods: {
    getOptionPath(index: number) {
      return [...this.elementsPath, index];
    },
  },
  computed: {
    elementsPath(): string[] {
      return [...(this.path as string[]), 'elements'];
    },
    options(): Array<Element> {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.elementsPath,
      );
    },
  },
});
</script>

<style lang="scss"></style>
