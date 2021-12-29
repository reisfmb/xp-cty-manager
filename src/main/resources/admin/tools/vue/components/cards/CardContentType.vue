<template lang="pug">

    div
      p Content Type Card
      RecursiveComponentRender(:path="path")

</template>

<script lang="ts">
import Vue from 'vue';
import { Element } from '@reginaldlee/xml-js';
import * as ModuleContentType from '../../store/ModuleContentType';

// @ts-ignore
export default Vue.extend({
  name: 'CardContentType',
  props: { path: Array },
  beforeCreate() {
    ((this.$options || {}).components || {}).RecursiveComponentRender = require('../RecursiveComponentRender.vue').default;
  },
  computed: {
    elements(): Element[] | null {
      const path = [...this.path as string[], 'elements'];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || null;
    },
  },
});

</script>

<style lang="scss" scoped>
</style>
