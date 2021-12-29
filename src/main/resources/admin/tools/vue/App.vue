<template lang="pug">

    v-app
      HeaderButtons
      RecursiveComponentRender(:path="[]")

</template>

<script>

import HeaderButtons from './components/HeaderButtons.vue';
import RecursiveComponentRender from './components/RecursiveComponentRender.vue';

export default {
  name: 'App',
  components: {
    HeaderButtons,
    RecursiveComponentRender,
  },
};

</script>

<style></style>
