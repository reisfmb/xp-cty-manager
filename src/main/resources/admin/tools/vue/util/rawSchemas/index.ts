import AttachmentUploader from "./schemas/attachment-uploader";
import CheckBox from "./schemas/check-box";
import ComboBox from "./schemas/combo-box";
import ContentSelector from "./schemas/content-selector";
import ContentType from "./schemas/content-type";
import ContentTypeFilter from "./schemas/content-type-filter";
import CustomSelector from "./schemas/custom-selector";
import _Date from "./schemas/date";
import DateTime from "./schemas/date-time";
import Double from "./schemas/double";
import FieldSet from "./schemas/field-set";
import GeoPoint from "./schemas/geo-point";
import HtmlArea from "./schemas/html-area";
import ImageSelector from "./schemas/image-selector";
import ItemSet from "./schemas/item-set";
import Long from "./schemas/long";
import MediaSelector from "./schemas/media-selector";
import Mixin from "./schemas/mixin";
import Option from "./schemas/option";
import OptionSet from "./schemas/option-set";
import RadioButton from "./schemas/radio-button";
import Tag from "./schemas/tag";
import TextArea from "./schemas/text-area";
import TextLine from "./schemas/text-line";
import Time from "./schemas/time";

// There's the need to have raw schemas in order to add new ones in the form tag of the
// new cty, or to get what fields are necessary for each one of them.
export default {
  AttachmentUploader,
  CheckBox,
  ComboBox,
  ContentSelector,
  ContentType,
  ContentTypeFilter,
  CustomSelector,
  ["Date"]: _Date,
  DateTime,
  Double,
  FieldSet,
  GeoPoint,
  HtmlArea,
  ImageSelector,
  ItemSet,
  Long,
  MediaSelector,
  Mixin,
  Option,
  OptionSet,
  RadioButton,
  Tag,
  TextArea,
  TextLine,
  Time,
};
