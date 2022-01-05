import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<field-set>
  <label>myfieldset</label>
  <items/>
</field-set>`.trim()
);
