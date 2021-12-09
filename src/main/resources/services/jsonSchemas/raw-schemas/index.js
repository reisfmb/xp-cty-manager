const AttachmentUploader = `
<input name="myattachmentuploader" type="AttachmentUploader">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
</input>`.trim()

const CheckBox = `
<input name="mycheckbox" type="CheckBox">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <default></default>
    <config>
        <alignment></alignment>
    </config>
</input>`.trim()

const ComboBox = `
<input name="mycombobox" type="ComboBox">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config />
    <default></default>
</input>`.trim()

const ContentSelector = `
<input name="mycontentselector" type="ContentSelector">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <treeMode />
        <hideToggleIcon />
    </config>
</input>`.trim()

const ContentTypeFilter = `
<input name="myctyfilter" type="ContentTypeFilter">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <context />
    </config>
</input>`.trim()

const CustomSelector = `
<input name="mycustomselector" type="CustomSelector">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <service />
    </config>
</input>`.trim()

const Date = `
<input name="mydate" type="Date">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <default />
</input>`.trim()

const DateTime = `
<input name="mydatetime" type="DateTime">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <timezone />
    </config>
    <default />
</input>`.trim()

const Double = `
<input name="mydouble" type="Double">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <min />
        <max />
    </config>
    <default />
</input>`.trim()

const FieldSet = `
<field-set>
    <label>myfieldset</label>
    <items/>
</field-set>`

const GeoPoint = `
<input name="mygeopoint" type="GeoPoint">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <default/>
</input>`.trim()

const HtmlArea = `
<input name="myhtmlarea" type="HtmlArea">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <default />
    <config>
        <exclude />
        <include />
        <allowHeadings />
    </config>
</input>`.trim()

const ImageSelector = `
<input name="myimage" type="ImageSelector">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <treeMode />
        <hideToggleIcon />
    </config>
</input>`.trim()

const ItemSet = `
<item-set name="myitemset">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <items/>
</item-set>`.trim()

const Long = `
<input name="mylong" type="Long">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <min />
        <max />
    </config>
    <default />
</input>`.trim()

const MediaSelector = `
<input name="mymediaselector" type="MediaSelector">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <treeMode />
        <hideToggleIcon />
    </config>
</input>`.trim()

const Mixin = `
<mixin name="mymixin"></mixin>`.trim()

const Option = `
<option name="myoptionsetoption">
    <label />
    <items />
</option>`.trim()

const OptionSet = `
<option-set name="myoptionset">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <expanded />
    <options minimum="1" maximum="1" />
</option-set>`.trim()

const RadioButton = `
<input name="myradiobutton" type="RadioButton">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config />
    <default />
</input>`.trim()

const Tag = `
<input name="mytag" type="Tag">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
</input>`.trim()

const TextArea = `
<input name="mytextarea" type="TextArea">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <default />
    <config>
        <max-length />
        <show-counter />
    </config>
</input>`.trim()

const TextLine = `
<input name="mytextline" type="TextLine">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <default />
    <config>
        <max-length />
        <show-counter />
        <regexp />
    </config>
</input>`.trim()

const Time = `
<input name="mytime" type="Time">
    <label />
    <help-text />
    <occurrences minimum="0" maximum="1"/>
    <config>
        <timezone />
    </config>
    <default />
</input>
`.trim()

module.exports = {
    AttachmentUploader,
    CheckBox,
    ComboBox,
    ContentSelector,
    ContentTypeFilter,
    CustomSelector,
    Date,
    DateTime,
    Double,
    FieldSet,
    GeoPoint,
    HtmlArea,
    ImageSelector,
    ItemSet,
    Long,
    MediaSelector,
    Mixin,
    Option,
    OptionSet,
    RadioButton,
    Tag,
    TextArea,
    TextLine,
    Time
}
