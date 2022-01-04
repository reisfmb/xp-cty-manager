import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<content-type>
  <display-name></display-name>
  <display-name-label></display-name-label>
  <description></description>
  <super-type></super-type>
  <is-abstract></is-abstract>
  <is-final></is-final>
  <is-built-in></is-built-in>
  <allow-child-content></allow-child-content>
  <form></form>
</content-type>`.trim()
);
