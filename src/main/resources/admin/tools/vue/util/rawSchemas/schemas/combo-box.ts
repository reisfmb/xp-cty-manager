import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="mycombobox" type="ComboBox">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <option value="one">Option One</option>
    <option value="two">Option Two</option>
  </config>
  <default/>
</input>`.trim()
);