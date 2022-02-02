import { xml2js } from '@reginaldlee/xml-js';

export default xml2js(
  `
<option-set name="myoptionset">
  <label />
  <help-text />
  <occurrences minimum="0" maximum="1"/>
  <expanded />
  <options minimum="0" maximum="1" />
</option-set>`.trim(),
);
