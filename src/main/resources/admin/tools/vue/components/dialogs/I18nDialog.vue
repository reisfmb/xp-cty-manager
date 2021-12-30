<template lang="pug">
div
  v-dialog(v-model="dialog.show", max-width="600")
    v-card
      v-card-title {{ dialog.title }}
      v-card-text
        v-text-field.mb-5(
          v-model="states.text",
          :label="field.label",
          :hint="field.hint",
          :rules="[rules.noSpaces]",
          persistent-hint
        )
        v-btn(@click="apply") {{ button.label }}
</template>

<script lang="ts">
import Vue from "vue";
import * as ModuleContentType from "../../store/ModuleContentType";
import rules from "../../util/rules";

export default Vue.extend({
  name: "I18nDialog",
  props: {
    showDialog: Boolean,
    path: Array,
  },
  data: () => ({
    dialog: { show: false, title: "I18n Key" },
    button: { label: "Apply" },
    states: { text: "" },
    rules: rules,
    field: {
      label: "Key value",
      hint: `This i18n attribute will contain a key string that refers to the
      translated texts in the i18n/phrases.properties bundle files.`,
    },
  }),
  mounted() {
    this.states.text = this.value;
  },
  watch: {
    value() {
      this.states.text = this.value;
    },
    showDialog() {
      this.dialog.show = this.showDialog;
    },
  },
  methods: {
    apply() {
      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.pathToValue,
        value: this.states.text,
      });

      this.closeDialog();
    },

    closeDialog() {
      this.dialog.show = false;
    },
  },
  computed: {
    pathToValue(): string[] {
      return [...(this.path as string[]), "attributes", "i18n"];
    },
    value(): string {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.pathToValue
      );
    },
  },
});
</script>

<style lang="scss"></style>
