import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="myattachment" type="AttachmentUploader">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
</input>`.trim()
);
