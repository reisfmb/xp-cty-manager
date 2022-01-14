import { xml2js } from '@reginaldlee/xml-js';

export default xml2js(
  `
<input name="mycontentselector" type="ContentSelector">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <treeMode>true</treeMode>
    <hideToggleIcon>true</hideToggleIcon>
  </config>
</input>`.trim(),
);
