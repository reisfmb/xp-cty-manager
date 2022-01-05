import { IComponentProps } from "../type";

export default {
  component: "TextInput",
  field: {
    label: "Maximum Length",
    hint: "Specifies the maximum allowed number of characters (default: unlimited).",
  },
  rules: ["numbersOnly"],
  i18n: false,
} as IComponentProps;
