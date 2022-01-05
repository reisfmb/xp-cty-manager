import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="myhtmlarea" type="HtmlArea">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <default/>
  <config>
    <exclude></exclude>
    <include></include>
    <allowHeadings></allowHeadings>
  </config>
</input>`.trim()
);
