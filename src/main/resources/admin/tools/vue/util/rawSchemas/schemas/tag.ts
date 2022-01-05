import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="mytag" type="Tag">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
</input>`.trim()
);
