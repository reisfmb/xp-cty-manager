<template lang="pug">
v-card
  .row(@click="show = !show")
    v-col(cols="9")
      v-card-title {{ inputName }}
      v-card-subtitle {{ inputType }}

    v-col.d-flex.align-center.justify-end(cols="3")
      v-btn(icon)
        v-icon {{ buttons.moveUp.icon }}
      v-btn(icon)
        v-icon {{ buttons.moveDown.icon }}
      v-btn(icon)
        v-icon {{ buttons.remove.icon }}

  v-card-text(v-show="show")
    RecursiveComponentRender(:path="path")
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "../inputs/TextInput.vue";
import * as ModuleContentType from "../../store/ModuleContentType";

export default Vue.extend({
  name: "CardInput",
  components: { TextInput },
  props: {
    path: Array,
  },
  data: () => ({
    show: true,
    buttons: {
      moveUp: { icon: "mdi-arrow-up" },
      moveDown: { icon: "mdi-arrow-down" },
      remove: { icon: "mdi-delete-circle-outline" },
    },
  }),
  beforeCreate() {
    ((this.$options || {}).components || {}).RecursiveComponentRender =
      require("../RecursiveComponentRender.vue").default;
  },
  computed: {
    inputName(): string {
      const path = [...this.path, "attributes", "name"] as string[];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || "";
    },
    inputType(): string {
      const path = [...this.path, "attributes", "type"] as string[];
      return ModuleContentType.getContentTypeByPath(this.$store)(path) || "";
    },
  },
});
</script>

<style lang="scss"></style>
