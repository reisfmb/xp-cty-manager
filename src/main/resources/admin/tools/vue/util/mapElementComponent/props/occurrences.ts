import { IComponentProps } from "../type";

export default {
  component: "TextAttributeInput",
  attributes: ["minimum", "maximum"],
  rules: ["requiredText", "noSpaces", "numbersOnly", "numberNotNegative"],
} as IComponentProps;
