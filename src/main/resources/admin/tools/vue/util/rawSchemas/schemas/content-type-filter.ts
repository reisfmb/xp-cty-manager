import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="myctyfilter" type="ContentTypeFilter">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <context>true</context>
  </config>
</input>`.trim()
);
