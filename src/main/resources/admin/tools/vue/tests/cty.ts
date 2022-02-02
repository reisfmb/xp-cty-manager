export default `
<content-type>
  <display-name></display-name>
  <display-name-label></display-name-label>
  <display-name-expression></display-name-expression>
  <description></description>
  <super-type></super-type>
  <is-abstract></is-abstract>
  <is-final></is-final>
  <is-built-in></is-built-in>
  <allow-child-content></allow-child-content>
  <form>
    <input type="TextLine" name="mytextline">
      <label>MyTextLine</label>
      <occurrences minimum="1" maximum="1"/>
    </input>
    <input type="HtmlArea" name="myhtmlarea">
      <label>MyHtmlArea</label>
      <occurrences minimum="0" maximum="1"/>
    </input>
    <input type="ContentSelector" name="mycontentselector">
    <label>MyContentSelector</label>
      <occurrences minimum="1" maximum="0"/>
      <config/>
    </input>
  </form>
</content-type>`;
