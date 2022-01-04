import { IMap } from "./type";

import AlignmentProps from "./props/alignment";
import AllowChildContentProps from "./props/allow-child-content";
import ConfigProps from "./props/config";
import ContentTypeProps from "./props/content-type";
import DefaultProps from "./props/default";
import DescriptionProps from "./props/description";
import DisplayNameProps from "./props/display-name";
import DisplayNameExpressionProps from "./props/display-name-expression";
import DisplayNameLabelProps from "./props/display-name-label";
import HelpTextProps from "./props/help-text";
import InputProps from "./props/input";
import IsAbstractProps from "./props/is-abstract";
import IsFinalProps from "./props/is-final";
import LabelProps from "./props/label";
import OccurencesProps from "./props/occurrences";
import SuperTypeProps from "./props/super-type";

// When RecursiveComponentRender is called, it'll try to access the elements of the
// current path in it by traversing the elements array and looking for the "name" attribute.
// That name is going to be used in the hash-map below in order to get which component should
// be rendered, with the appropriate properties.
export default {
  ["alignment"]: AlignmentProps,
  ["allow-child-content"]: AllowChildContentProps,
  ["config"]: ConfigProps,
  ["content-type"]: ContentTypeProps,
  ["default"]: DefaultProps,
  ["description"]: DescriptionProps,
  ["display-name"]: DisplayNameProps,
  ["display-name-expression"]: DisplayNameExpressionProps,
  ["display-name-label"]: DisplayNameLabelProps,
  ["help-text"]: HelpTextProps,
  ["input"]: InputProps,
  ["is-abstract"]: IsAbstractProps,
  ["is-final"]: IsFinalProps,
  ["label"]: LabelProps,
  ["occurrences"]: OccurencesProps,
  ["super-type"]: SuperTypeProps,
} as IMap;
