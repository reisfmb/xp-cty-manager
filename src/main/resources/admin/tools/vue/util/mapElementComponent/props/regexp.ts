import { IComponentProps } from "../type";

export default {
  component: "TextInput",
  field: {
    label: "Regular Expression",
    hint: "Supports validation by defining regular expressions.",
  },
  rules: ["validRegex"],
  i18n: false,
} as IComponentProps;
