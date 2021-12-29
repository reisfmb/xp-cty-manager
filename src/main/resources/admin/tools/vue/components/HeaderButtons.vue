<template lang="pug">

  div
    LoadButton
    NewButton

</template>

<script lang="ts">
import Vue from 'vue';

import LoadButton from './LoadButton.vue';
import NewButton from './NewButton.vue';

export default Vue.extend({
  name: 'HeaderButtons',
  components: { LoadButton, NewButton },
});
</script>

<style lang="scss"></style>
