import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="mytextline" type="TextLine">
  <label>My TextLine</label>
</input>`.trim()
);
