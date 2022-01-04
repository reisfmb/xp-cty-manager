import AttachmentUploader from "./schemas/attachment-uploader";
import CheckBox from "./schemas/check-box";
import ComboBox from "./schemas/combo-box";
// import ContentTypeElement from "./schemas/content-type";
import TextLineElement from "./schemas/text-line";

// There's the need to have raw schemas in order to add new ones in the form tag of the
// new cty, or to get what fields are necessary for each one of them.
export default {
  ["AttachmentUploader"]: AttachmentUploader,
  ["CheckBox"]: CheckBox,
  ["ComboBox"]: ComboBox,
  // ["content-type"]: ContentTypeElement,
  ["TextLine"]: TextLineElement,
};
