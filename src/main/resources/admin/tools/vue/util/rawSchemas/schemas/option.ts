import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<option name="optioninmyoptionset">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <items/>
</option>`.trim()
);
