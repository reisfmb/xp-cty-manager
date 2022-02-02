<template lang="pug">
v-card
  .row
    v-col(cols="9")
      v-card-text
        TextAttributeInput(
          :path="path",
          :field="field",
          :attributes="attributes",
          :rules="rules"
        )

    v-col.d-flex.align-center.justify-end(cols="3")
      ElementButtons(:path="path")
</template>

<script lang="ts">
import Vue from 'vue';
import TextAttributeInput from '../inputs/TextAttributeInput.vue';
import ElementButtons from '../buttons/ElementButtons.vue';

export default Vue.extend({
  name: 'CardMixin',
  components: { TextAttributeInput, ElementButtons },
  props: {
    path: Array,
    field: Object, // label
    attributes: Array,
    rules: Array, // name of the used rules
  },
});
</script>

<style lang="scss"></style>
