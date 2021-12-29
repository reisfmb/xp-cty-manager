<template lang="pug">
    div(v-if="elements")
        component(
          v-for="(element, index) in elements"
          v-if="getComponentName(element.name)"
          :is="getComponentName(element.name)"
          v-bind="getComponentProps(element.name, index)"
        )

</template>

<script lang="ts">
import Vue from 'vue';
import { Element } from '@reginaldlee/xml-js';
import * as ModuleContentType from '../store/ModuleContentType';

import TextInput from './inputs/TextInput.vue';

export default Vue.extend({
  name: 'RecursiveComponentRender',
  components: { TextInput },
  props: { path: Array },
  beforeCreate() {
    ((this.$options || {}).components || {}).CardContentType = require('./cards/CardContentType.vue').default;
  },
  methods: {
    getComponentName(elementName: string) {
      const props = this.$gf.getComponentProps(elementName);
      if(!props) { return null };

      return props.component;
    },
    getComponentProps(elementName: string, index: number) {
      let props = this.$gf.getComponentProps(elementName);
      if(!props) { return null };

      props.path = this.$gf.innerPath(this.path as string[], index);
      return props;
    }
  },
  computed: {
    elements(): Element[] | null {
      const path = [...this.path as string[], 'elements'];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || null;
    },
  },
});
</script>

<style lang="scss"></style>
