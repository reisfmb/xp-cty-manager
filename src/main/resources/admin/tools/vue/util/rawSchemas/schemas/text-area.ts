import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="mytextarea" type="TextArea">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <show-counter></show-counter>
    <max-length></max-length>
  </config>
</input>`.trim()
);
