import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<item-set name="myitemset">
  <label />
  <help-text />
  <occurrences minimum="0" maximum="1"/>
  <items/>
</item-set>`.trim()
);
