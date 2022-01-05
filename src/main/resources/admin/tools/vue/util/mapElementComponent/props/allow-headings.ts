import { IComponentProps } from "../type";

export default {
  component: "TextInput",
  field: {
    label: "Allow Headings",
    hint: "Space-separated list of allowed heading tags (from <h1> to <h6>); by default all are allowed.",
  },
  rules: [],
  i18n: false,
} as IComponentProps;
