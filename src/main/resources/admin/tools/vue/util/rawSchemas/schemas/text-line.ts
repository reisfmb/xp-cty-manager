import { xml2js } from '@reginaldlee/xml-js';

export default xml2js(
  `
<input name="mytextline" type="TextLine">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <show-counter></show-counter>
    <max-length></max-length>
    <regexp></regexp>
  </config>
</input>`.trim(),
);
