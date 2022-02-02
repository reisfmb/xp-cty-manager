import { xml2js } from '@reginaldlee/xml-js';

export default xml2js(
  `
<input name="mygeopoint" type="GeoPoint">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <default/>
</input>`.trim(),
);
