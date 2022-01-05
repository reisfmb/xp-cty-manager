import { xml2js } from "@reginaldlee/xml-js";

export default xml2js(
  `
<input name="mycustomselector" type="CustomSelector">
  <label/>
  <help-text/>
  <occurrences minimum="0" maximum="1"/>
  <config>
    <service>spotify-music-selector</service>
    <param value="genre">classic</param>
    <param value="sortBy">length</param>
  </config>
</input>`.trim()
);
