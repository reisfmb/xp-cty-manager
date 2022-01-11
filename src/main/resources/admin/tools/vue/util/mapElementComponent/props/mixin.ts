import { IComponentProps } from "../type";

export default {
  component: "TextAttributeInput",
  field: { label: "Mixin" },
  attributes: ["name"],
  rules: ["requiredText", "noSpaces"],
} as IComponentProps;
