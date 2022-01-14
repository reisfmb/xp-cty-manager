<template lang="pug">
v-checkbox(
  @click="save",
  v-model="states.bool",
  :label="field.label",
  :hint="field.hint"
)
</template>

<script lang="ts">
import Vue from 'vue';
import * as ModuleContentType from '../../store/ModuleContentType';

export default Vue.extend({
  name: 'BooleanInput',
  props: {
    path: Array,
    rules: Array, // name of the used rules
    i18n: Boolean,
    field: Object, // label, hint
  },
  data: () => ({
    states: { bool: false },
  }),
  mounted() {
    this.states.bool = this.value || false;
    this.save();
  },
  watch: {
    value() {
      this.states.bool = this.value;
    },
  },
  methods: {
    save() {
      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.pathToElement,
        value: { text: this.states.bool.toString(), type: 'text' },
      });
    },
  },
  computed: {
    pathToElement(): (string | number)[] {
      return [...(this.path as string[]), 'elements', 0];
    },
    pathToValue(): (string | number)[] {
      return [...(this.pathToElement as string[]), 'text'];
    },
    value(): boolean {
      return (
        ModuleContentType.getContentTypeByPath(this.$store)(
          this.pathToValue,
        ) === 'true'
      );
    },
  },
});
</script>

<style lang="scss"></style>
