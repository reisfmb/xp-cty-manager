<template lang="pug">
.row
  template(v-for="attribute in attributes")
    v-col
      v-text-field(
        @blur="save",
        v-model="states[attribute]",
        :label="capitalize(attribute)",
        :rules="usedRules",
        :class="{ required: usesRequiredRule }"
      )
</template>

<script lang="ts">
import Vue from "vue";
import * as ModuleContentType from "../../store/ModuleContentType";
import rules from "../../util/rules";
import * as R from "ramda";

export default Vue.extend({
  name: "TextAttributeInput",
  props: {
    path: Array,
    attributes: Array,
    rules: Array, // name of the used rules
  },
  data: () => ({
    states: {} as { [key: string]: string },
    showI18nDialog: false,
  }),
  mounted() {
    const attrsInCty = ModuleContentType.getContentTypeByPath(this.$store)(
      this.pathToAttributes
    );

    (this.attributes as string[]).forEach((attr: string) => {
      Vue.set(this.states, attr, attrsInCty[attr]);
    });
  },
  methods: {
    save() {
      const ctyAttributes = ModuleContentType.getContentTypeByPath(this.$store)(
        this.pathToAttributes
      );

      const updatedAttributes = {
        ...ctyAttributes,
        ...this.states,
      };

      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.pathToAttributes,
        value: updatedAttributes,
      });
    },
    capitalize(s: string): string {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
  },
  computed: {
    pathToAttributes(): string[] {
      return [...(this.path as string[]), "attributes"];
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
