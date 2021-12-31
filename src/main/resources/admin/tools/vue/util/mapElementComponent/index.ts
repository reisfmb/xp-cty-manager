import { IMap } from "./type";

import AllowChildContentProps from "./props/allow-child-content";
import ContentTypeProps from "./props/content-type";
import DescriptionProps from "./props/description";
import DisplayNameProps from "./props/display-name";
import DisplayNameExpressionProps from "./props/display-name-expression";
import DisplayNameLabelProps from "./props/display-name-label";
import IsAbstractProps from "./props/is-abstract";
import IsFinalProps from "./props/is-final";
import SuperTypeProps from "./props/super-type";

export default {
  ["allow-child-content"]: AllowChildContentProps,
  ["content-type"]: ContentTypeProps,
  ["description"]: DescriptionProps,
  ["display-name"]: DisplayNameProps,
  ["display-name-expression"]: DisplayNameExpressionProps,
  ["display-name-label"]: DisplayNameLabelProps,
  ["is-abstract"]: IsAbstractProps,
  ["is-final"]: IsFinalProps,
  ["super-type"]: SuperTypeProps,
} as IMap;
