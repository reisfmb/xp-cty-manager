<template lang="pug">
v-card
  .row.pointer(@click="show = !show")
    v-col(cols="9")
      v-card-title {{ inputName }}
      v-card-subtitle
        a(:href="docsUrl", target="_blank", @click.stop) {{ inputType }}

    v-col.d-flex.align-center.justify-end(cols="3")
      ElementButtons(:path="path")

  transition(name="fade")
    v-card-text(v-show="show")
      TextAttributeInput(
        :path="path",
        :attributes="['name']",
        :rules="['requiredText', 'noSpaces']"
      )
      RecursiveComponentRender(:path="path")
</template>

<script lang="ts">
import Vue from "vue";
import ElementButtons from "../buttons/ElementButtons.vue";
import TextAttributeInput from "../inputs/TextAttributeInput.vue";
import TextInput from "../inputs/TextInput.vue";
import * as ModuleContentType from "../../store/ModuleContentType";

export default Vue.extend({
  name: "CardInput",
  components: { TextInput, TextAttributeInput, ElementButtons },
  props: {
    path: Array,
  },
  data: () => ({
    show: false,
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
    docsUrl(): string {
      return `https://developer.enonic.com/docs/xp/stable/cms/input-types#${this.inputType.toLowerCase()}`;
    },
  },
});
</script>

<style lang="scss"></style>
