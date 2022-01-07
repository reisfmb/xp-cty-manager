<template lang="pug">
.d-flex
  NewButton
  LoadButton
  SaveButton
</template>

<script lang="ts">
import Vue from "vue";

import LoadButton from "./buttons/LoadButton.vue";
import NewButton from "./buttons/NewButton.vue";
import SaveButton from "./buttons/SaveButton.vue";

export default Vue.extend({
  name: "HeaderButtons",
  components: { LoadButton, NewButton, SaveButton },
});
</script>

<style lang="scss"></style>
