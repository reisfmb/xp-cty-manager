import { IMap } from "./type";

import AlignmentProps from "./props/alignment";
import AllowChildContentProps from "./props/allow-child-content";
import AllowHeadingsProps from "./props/allow-headings";
import ConfigProps from "./props/config";
import ContentTypeProps from "./props/content-type";
import ContextProps from "./props/context";
import DefaultProps from "./props/default";
import DescriptionProps from "./props/description";
import DisplayNameProps from "./props/display-name";
import DisplayNameExpressionProps from "./props/display-name-expression";
import DisplayNameLabelProps from "./props/display-name-label";
import ExcludeProps from "./props/exclude";
import ExpandedProps from "./props/expanded";
import FieldSetProps from "./props/field-set";
import HelpTextProps from "./props/help-text";
import HideToggleIconProps from "./props/hide-toggle-icon";
import IncludeProps from "./props/include";
import InputProps from "./props/input";
import IsAbstractProps from "./props/is-abstract";
import IsFinalProps from "./props/is-final";
import ItemSetProps from "./props/item-set";
import MinProps from "./props/min";
import MaxProps from "./props/max";
import MaxLengthProps from "./props/max-length";
import LabelProps from "./props/label";
import OccurencesProps from "./props/occurrences";
import OptionSetProps from "./props/option-set";
import OptionsProps from "./props/options";
import RegexpProps from "./props/regexp";
import ServiceProps from "./props/service";
import ShowCounterProps from "./props/show-counter";
import SuperTypeProps from "./props/super-type";
import TimezoneProps from "./props/timezone";
import TreeModeProps from "./props/tree-mode";

// When RecursiveComponentRender is called, it'll try to access the elements of the
// current path in it by traversing the elements array and looking for the "name" attribute.
// That name is going to be used in the hash-map below in order to get which component should
// be rendered, with the appropriate properties.
export default {
  ["alignment"]: AlignmentProps,
  ["allow-child-content"]: AllowChildContentProps,
  ["allowHeadings"]: AllowHeadingsProps,
  ["config"]: ConfigProps,
  ["content-type"]: ContentTypeProps,
  ["context"]: ContextProps,
  ["default"]: DefaultProps,
  ["description"]: DescriptionProps,
  ["display-name"]: DisplayNameProps,
  ["display-name-expression"]: DisplayNameExpressionProps,
  ["display-name-label"]: DisplayNameLabelProps,
  ["exclude"]: ExcludeProps,
  ["expanded"]: ExpandedProps,
  ["field-set"]: FieldSetProps,
  ["help-text"]: HelpTextProps,
  ["hideToggleIcon"]: HideToggleIconProps,
  ["include"]: IncludeProps,
  ["input"]: InputProps,
  ["is-abstract"]: IsAbstractProps,
  ["is-final"]: IsFinalProps,
  ["item-set"]: ItemSetProps,
  ["label"]: LabelProps,
  ["min"]: MinProps,
  ["max"]: MaxProps,
  ["max-length"]: MaxLengthProps,
  ["occurrences"]: OccurencesProps,
  ["option-set"]: OptionSetProps,
  ["options"]: OptionsProps,
  ["regexp"]: RegexpProps,
  ["service"]: ServiceProps,
  ["show-counter"]: ShowCounterProps,
  ["super-type"]: SuperTypeProps,
  ["timezone"]: TimezoneProps,
  ["treeMode"]: TreeModeProps,
} as IMap;
