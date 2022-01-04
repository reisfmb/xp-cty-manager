<template lang="pug">
div
  RecursiveComponentRender(:path="path")
  NewElementButton(:path="path", :hide="['Option']")
</template>

<script lang="ts">
// TODO: this.path can be empty if <form> tag wasn't found in the cty xml.
//       If that is the case, there's the need to add a "form" element to the first "elements",
//       rendered by CardContentType component.
import Vue from "vue";
import RecursiveComponentRender from "../RecursiveComponentRender.vue";
import NewElementButton from "../buttons/NewElementButton.vue";

export default Vue.extend({
  name: "CardForm",
  components: { RecursiveComponentRender, NewElementButton },
  props: {
    path: Array,
  },
  data: () => ({}),
  mounted() {},
  methods: {},
  computed: {},
});
</script>

<style lang="scss"></style>
