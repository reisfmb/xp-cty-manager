import { IComponentProps } from "../type";

export default {
  component: "TextInput",
  field: {
    label: "Label",
    hint: "Is another mandatory field that holds the human readable value that will be displayed when listing the input type control in the administrative interface.",
  },
  rules: ["requiredText"],
  i18n: true,
} as IComponentProps;
