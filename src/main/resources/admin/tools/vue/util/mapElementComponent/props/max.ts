import { IComponentProps } from "../type";

export default {
  component: "TextInput",
  field: {
    label: "Maximum",
    hint: "Optionally specifies the maximum allowed value.",
  },
  rules: ["numbersOnly"],
  i18n: false,
} as IComponentProps;
