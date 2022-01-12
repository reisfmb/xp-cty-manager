<template lang="pug">
div
  v-select(
    v-model="states.options",
    @blur="save",
    :label="field.label",
    :hint="field.hint",
    :items="options.items",
    item-text="text",
    item-value="value",
    :rules="usedRules",
    :class="{ required: usesRequiredRule }",
    :multiple="options.config.multiple"
  )

  I18nDialog(v-if="i18n", :showDialog="showI18nDialog", :path="path")
</template>

<script lang="ts">
import Vue from "vue";
import * as R from "ramda";
import * as ModuleContentType from "../../store/ModuleContentType";
import { IComponentProps } from "../../util/mapElementComponent/type";
import I18nDialog from "../dialogs/I18nDialog.vue";
import rules from "../../util/rules";

export default Vue.extend({
  name: "OptionsInput",
  components: { I18nDialog },
  props: {
    fallbackValue: String,
    options: Object as () => IComponentProps["options"],
    path: Array,
    rules: Array,
    i18n: Boolean,
    field: Object,
  },
  data: () => ({
    states: {
      options: [] as Array<string> | string,
    },
    showI18nDialog: false,
  }),
  mounted() {
    const currentValue = (this.value || this.fallbackValue || "").toString();

    this.states.options = currentValue.includes(this.joinWith)
      ? currentValue.split(this.joinWith)
      : currentValue;

    this.save();
  },
  methods: {
    save() {
      const text = this.getOptionsValueAsString();
      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.pathToElement,
        value: { text, type: "text" },
      });
    },
    dialog() {
      this.showI18nDialog = false;
      setTimeout(() => (this.showI18nDialog = true), 100);
    },
    getOptionsValueAsString(): string {
      return typeof this.states.options === "string"
        ? this.states.options
        : this.states.options.join(this.joinWith);
    },
  },
  computed: {
    joinWith(): string {
      return this.options ? this.options.config.joinWith || " " : " ";
    },
    pathToElement(): (string | number)[] {
      return [...(this.path as string[]), "elements", 0];
    },
    pathToValue(): (string | number)[] {
      return [...(this.pathToElement as string[]), "text"];
    },
    value(): string {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.pathToValue
      );
    },
    usedRules(): Function[] {
      return R.props(this.rules as string[], rules);
    },
    usesRequiredRule(): boolean {
      return (this.rules as string[]).some((ruleName: string) =>
        ruleName.includes("required")
      );
    },
  },
});
</script>

<style lang="scss"></style>
