import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="mydatetime" type="DateTime">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <default/>
  <config>
    <timezone>false</timezone>
  </config>
</input>`.trim()
);
