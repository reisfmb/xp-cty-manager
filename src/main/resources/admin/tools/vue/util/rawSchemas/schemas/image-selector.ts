import { xml2js } from '@reginaldlee/xml-js';

export default xml2js(
  `
<input name="myimageselector" type="ImageSelector">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <treeMode>true</treeMode>
    <hideToggleIcon>true</hideToggleIcon>
  </config>
</input>`.trim(),
);
