import { IComponentProps } from "../type";

export default {
  component: "TextInput",
  field: {
    label: "Minimum",
    hint: "Optionally specifies the minimum allowed value.",
  },
  rules: ["numbersOnly"],
  i18n: false,
} as IComponentProps;
