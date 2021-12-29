<template lang="pug">
    div
        p Text Input - {{ field.label }}

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TextInput',
  props: { 
    field: Object, // label, hint
    rules: Array,
    i18n: Boolean,
    path: Array,
  },
});
</script>

<style lang="scss"></style>
