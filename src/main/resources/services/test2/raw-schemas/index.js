const AttachmentUploader = `
<input name="myattachmentuploader" type="AttachmentUploader">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
</input>`.trim()

const CheckBox = `
<input name="mycheckbox" type="CheckBox">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <default>checked</default>
    <config>
        <alignment>left</alignment>
    </config>
</input>`.trim()

const ComboBox = `
<input name="mycombobox" type="ComboBox">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <option value="default-combobox-option">Default ComboBox Option</option>
    </config>
    <default>default-combobox-option</default>
</input>`.trim()

const ContentSelector = `
<input name="mycontentselector" type="ContentSelector">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <allowContentType>example</allowContentType>
        <allowPath>/*</allowPath>
        <treeMode>false</treeMode>
        <hideToggleIcon>false</hideToggleIcon>
    </config>
</input>`.trim()

const ContentTypeFilter = `
<input name="myctyfilter" type="ContentTypeFilter">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <context>false</context>
    </config>
</input>`.trim()

const CustomSelector = `
<input name="mycustomselector" type="CustomSelector">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <service>my-service</service>
        <param value="example">param-example</param>
    </config>
</input>`.trim()

const Date = `
<input name="mydate" type="Date">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <default>2011-09-12</default>
</input>`.trim()

const DateTime = `
<input name="mydatetime" type="DateTime">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <timezone>false</timezone>
    </config>
    <default>2011-09-12</default>
</input>`.trim()

const Double = `
<input name="mydouble" type="Double">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <min>0</min>
        <max>10</max>
    </config>
    <default>5.5</default>
</input>`.trim()

const FieldSet = `
<field-set>
    <label>myfieldset</label>
    <items/>
</field-set>`

const GeoPoint = `
<input name="mygeopoint" type="GeoPoint">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
  <default>51.5,-0.1</default>(1)
</input>`.trim()

const HtmlArea = `
<input name="myhtmlarea" type="HtmlArea">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <default><h3>Enter description here</h3></default>
    <config>
        <exclude>*</exclude>
        <include>Format | JustifyBlock JustifyLeft JustifyCenter JustifyRight | BulletedList NumberedList Outdent Indent | SpecialChar Anchor Image Macro Link Unlink | Table | PasteModeSwitcher</include>
        <allowHeadings>h1 h2 h3 h4 h5 h6</allowHeadings>
    </config>
</input>`.trim()

const ImageSelector = `
<input name="myimage" type="ImageSelector">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <allowPath>/*</allowPath>
        <treeMode>false</treeMode>
        <hideToggleIcon>false</hideToggleIcon>
    </config>
</input>`.trim()

const ItemSet = `
<item-set name="myitemset">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <items/>
</item-set>`.trim()

const Long = `
<input name="mylong" type="Long">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <min>-100000000</min>
        <max>1000000000</max>
    </config>
    <default>0</default>
</input>`.trim()

const MediaSelector = `
<input name="mymediaselector" type="MediaSelector">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <allowContentType>media:archive</allowContentType>
        <allowPath>/*</allowPath>
        <treeMode>false</treeMode>
        <hideToggleIcon>false</hideToggleIcon>
    </config>
</input>`.trim()

const Mixin = `
<mixin name="mymixin"></mixin>`.trim()

const Option = `
<option name="myoptionsetoption">
    <label></label>
    <items />
</option>`.trim()

const OptionSet = `
<option-set name="myoptionset">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <expanded>false</expanded>
    <options minimum="1" maximum="1" />
</option-set>`.trim()

const RadioButton = `
<input name="myradiobutton" type="RadioButton">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <option value="default-radiobutton-option">Default Radiobutton Option</option>
    </config>
    <default>default-radiobutton-option</default>
</input>`.trim()

const Tag = `
<input name="mytag" type="Tag">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
</input>`.trim()

const TextArea = `
<input name="mytextarea" type="TextArea">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <default>Default text goes here</default>
    <config>
        <max-length>50</max-length>
        <show-counter>true</show-counter>
    </config>
</input>`.trim()

const TextLine = `
<input name="mytextline" type="TextLine">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <default>Default text goes here</default>
    <config>
        <max-length>100</max-length>
        <show-counter>true</show-counter>
        <regexp>/*/g</regexp>
    </config>
</input>`.trim()

const Time = `
<input name="mytime" type="Time">
    <label></label>
    <help-text></help-text>
    <occurrences minimum="0" maximum="1"/>
    <config>
        <timezone>false</timezone>
    </config>
    <default>13:22</default>
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
