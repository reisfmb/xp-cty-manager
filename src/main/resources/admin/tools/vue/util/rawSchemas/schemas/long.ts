import { xml2js } from '@reginaldlee/xml-js';

export default xml2js(
  `
<input name="mylong" type="Long">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <min></min>
    <max></max>
  </config>
</input>`.trim(),
);
