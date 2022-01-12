import { IComponentProps } from "../type";

export default {
  component: "OptionsInput",
  field: {
    label: "Allow Headings",
    hint: "Space-separated list of allowed heading tags (from <h1> to <h6>); by default all are allowed.",
  },
  options: {
    items: [
      { text: "H1", value: "h1" },
      { text: "H2", value: "h2" },
      { text: "H3", value: "h3" },
      { text: "H4", value: "h4" },
      { text: "H5", value: "h5" },
      { text: "H6", value: "h6" },
    ],
    config: {
      multiple: true,
      joinWith: " ",
    },
  },
  rules: [],
  i18n: false,
} as IComponentProps;
