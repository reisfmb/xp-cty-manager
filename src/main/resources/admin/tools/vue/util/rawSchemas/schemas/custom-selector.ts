import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="mycustomselector" type="CustomSelector">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <service></service>
  </config>
</input>`.trim()
);
