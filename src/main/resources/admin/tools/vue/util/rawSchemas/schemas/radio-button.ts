import { xml2js } from '@reginaldlee/xml-js';

export default xml2js(
  `
<input name="myradiobutton" type="RadioButton">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <default/>
  <config>
  </config>
</input>`.trim(),
);
