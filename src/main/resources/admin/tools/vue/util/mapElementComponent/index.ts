import { IMap } from "./type";

import ContentTypeProps from "./content-type";
import DescriptionProps from "./description";
import DisplayNameProps from "./display-name";
import DisplayNameExpressionProps from "./display-name-expression";
import DisplayNameLabelProps from "./display-name-label";
import SuperTypeProps from "./super-type";

export default {
  ["content-type"]: ContentTypeProps,
  ["description"]: DescriptionProps,
  ["display-name"]: DisplayNameProps,
  ["display-name-expression"]: DisplayNameExpressionProps,
  ["display-name-label"]: DisplayNameLabelProps,
  ["super-type"]: SuperTypeProps,
} as IMap;
