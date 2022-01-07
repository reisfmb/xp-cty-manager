<template lang="pug">
v-app#app
  HeaderButtons
  v-form(ref="form", lazy-validation)
    RecursiveComponentRender(:path="[]")
</template>

<script>
import HeaderButtons from "./components/HeaderButtons.vue";
import RecursiveComponentRender from "./components/RecursiveComponentRender.vue";

export default {
  name: "App",
  components: {
    HeaderButtons,
    RecursiveComponentRender,
  },
};
</script>

<style></style>
