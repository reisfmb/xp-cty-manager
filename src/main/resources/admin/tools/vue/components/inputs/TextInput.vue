<template lang="pug">
div
  v-text-field(
    @blur="save",
    @click:append="i18n ? dialog() : null",
    :append-icon="i18n ? 'mdi-translate' : ''",
    v-model="states.text",
    :label="field.label",
    :hint="field.hint",
    :rules="usedRules",
    :class="{ required: usesRequiredRule }"
  )

  I18nDialog(v-if="i18n", :showDialog="showI18nDialog", :path="path")
</template>

<script lang="ts">
import Vue from 'vue';
import * as R from 'ramda';
import I18nDialog from '../dialogs/I18nDialog.vue';
import * as ModuleContentType from '../../store/ModuleContentType';
import rules from '../../util/rules';

export default Vue.extend({
  name: 'TextInput',
  components: { I18nDialog },
  props: {
    fallbackValue: String,
    path: Array,
    rules: Array, // name of the used rules
    i18n: Boolean,
    field: Object, // label, hint
  },
  data: () => ({
    states: { text: '' },
    showI18nDialog: false,
  }),
  mounted() {
    this.states.text = this.value || this.fallbackValue || '';
    this.save();
  },
  watch: {
    value() {
      this.states.text = this.value;
    },
  },
  methods: {
    save() {
      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.pathToElement,
        value: { text: this.states.text, type: 'text' },
      });
    },
    dialog() {
      this.showI18nDialog = false;
      setTimeout(() => { this.showI18nDialog = true; }, 100);
    },
  },
  computed: {
    pathToElement(): (string | number)[] {
      return [...(this.path as string[]), 'elements', 0];
    },
    pathToValue(): (string | number)[] {
      return [...(this.pathToElement as string[]), 'text'];
    },
    value(): string {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.pathToValue,
      );
    },
    usedRules(): Function[] {
      return R.props(this.rules as string[], rules);
    },
    usesRequiredRule(): boolean {
      return (this.rules as string[]).some((ruleName: string) => ruleName.includes('required'));
    },
  },
});
</script>

<style lang="scss"></style>
