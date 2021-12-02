exports.get = _ => {

    const map = {
        // Text
        label: {
            componentName: "component-input-text",
            field: { 
                label: "Label", 
                hint: "Is another mandatory field that holds the human readable value that will be displayed when listing the input type control in the administrative interface." 
            },
            rules: ['requiredText'],
            i18n: true
        },
        ['help-text']: {
            componentName: "component-input-text",
            field: { 
                label: "Help Text", 
                hint: "Is an optional field that lets you specify a text label shown below the input field. Used for explanation of the field’s purpose." 
            },
            rules: [],
            i18n: true
        },
        default: {
            componentName: "component-input-text",
            field: { 
                label: "Default", 
                hint: "Is an optional field that lets you specify default values to be used by the input type." 
            },
            rules: [],
            i18n: false
        },
        alignment: {
            componentName: "component-input-text",
            field: { 
                label: "Alignment", 
                hint: "Defines placement of checkbox relative to label text. Supported values are: left, right, top, bottom. Default is left." 
            },
            rules: [],
            i18n: false
        },
        service: {
            componentName: "component-input-text",
            field: { 
                label: "Service", 
                hint: "Holds the name of a JavaScript service file, located under /resources/services/[my-custom-selector]/[my-custom-selector].js. You can also refer to a service file in another application, for example com.myapplication.app:myservice." 
            },
            rules: ['requiredText'],
            i18n: false
        },
        min: {
            componentName: "component-input-text",
            field: { 
                label: "Minimum", 
                hint: "Optionally specifies the minimum allowed value." 
            },
            rules: ['numbersOnly'],
            i18n: false
        },
        max: {
            componentName: "component-input-text",
            field: { 
                label: "Maximum", 
                hint: "Optionally specifies the maximum allowed value." 
            },
            rules: ['numbersOnly'],
            i18n: false
        },
        ['max-length']: {
            componentName: "component-input-text",
            field: { 
                label: "Max. Length", 
                hint: "Specifies the maximum allowed number of characters (default: unlimited)." 
            },
            rules: ['numbersOnly'],
            i18n: false
        }, 
        regexp: {
            componentName: "component-input-text",
            field: { 
                label: "Regular Expression", 
                hint: "Supports validation by defining regular expressions." 
            },
            rules: [],
            i18n: false
        },
        ['relationship-type']:{
            componentName: "component-input-text",
            field: { 
                label: "Relationship Type", 
                hint: "" 
            },
            rules: [],
            i18n: false
        },
        ['display-name']: {
            componentName: "component-input-text",
            field: { 
                label: "Display Name", 
                hint: "The human readable name of the content type. Optionally specify the i18n attribute to define a mapping to localize the value. The localisation key must then be declared and localised in the resource bundle." 
            },
            rules: ['requiredText'],
            i18n: true
        },
        ['display-name-label']: {
            componentName: "component-input-text",
            field: { 
                label: "Display Name Label", 
                hint: "Enables you to override the default <Display Name> placeholder used in the content form." 
            },
            rules: [],
            i18n: false
        },
        ['display-name-expression']: {
            componentName: "component-input-text",
            field: { 
                label: "Display Name Expression", 
                hint: "" 
            },
            rules: [],
            i18n: false
        },
        description: {
            componentName: "component-input-text",
            field: { 
                label: "Description", 
                hint: "Set a description that is shown when creating the content type." 
            },
            rules: [],
            i18n: true
        },
        ['super-type']: {
            componentName: "component-input-text",
            field: { 
                label: "Super Type", 
                hint: "Refers to the root controller of the form. For custom content types this should typically be set to base:structured." 
            },
            initialValue: 'base:structured',
            rules: ['requiredText'],
            i18n: false
        },

        // Boolean
        treeMode: {
            componentName: "component-input-boolean",
            field: { 
                label: "Tree Mode", 
                hint: "Toggles between tree and flat modes. Default value is false (flat mode)." 
            },
            rules: [],
            i18n: false
        },
        hideToggleIcon: {
            componentName: "component-input-boolean",
            field: { 
                label: "Hide Toggle Icon", 
                hint: "Hides the toggle icon when set to false." 
            },
            rules: [],
            i18n: false
        },
        context: {
            componentName: "component-input-boolean",
            field: { 
                label: "Context", 
                hint: "True limits the list of content types to the applications configured for the current site. Default is false." 
            },
            rules: [],
            i18n: false
        },
        timezone: {
            componentName: "component-input-boolean",
            field: { 
                label: "Timezone", 
                hint: "Set to true if timezone information should be used. Default is false." 
            },
            rules: [],
            i18n: false
        },
        ['show-counter']: {
            componentName: "component-input-boolean",
            field: { 
                label: "Show Counter", 
                hint: "Specifies whether text length counter should be shown (default: hidden)." 
            },
            rules: [],
            i18n: false
        },
        expanded: {
            componentName: "component-input-boolean",
            field: { 
                label: "Expanded", 
                hint: "Set to true to expand all of the options by default." 
            },
            rules: [],
            i18n: false
        },
        indexed: {
            componentName: "component-input-boolean",
            field: { 
                label: "Expanded", 
                hint: "" 
            },
            rules: [],
            i18n: false
        },
        showStatus: {
            componentName: "component-input-boolean",
            field: { 
                label: "Show Status", 
                hint: "" 
            },
            rules: [],
            i18n: false
        },
        ['is-abstract']: {
            componentName: "component-input-boolean",
            field: { 
                label: "Is Abstract", 
                hint: "If true, you cannot create content with this content type." 
            },
            rules: [],
            i18n: false
        },
        ['is-final']: {
            componentName: "component-input-boolean",
            field: { 
                label: "Is Final", 
                hint: "If true, it is not possible to create new content types that “extend” this." 
            },
            rules: [],
            i18n: false
        },
        ['is-built-in']: {
            componentName: "component-input-boolean",
            field: { 
                label: "Is Built In", 
                hint: "Only specified by built-in content types." 
            },
            rules: [],
            i18n: false
        },
        ['allow-child-content']: {
            componentName: "component-input-boolean",
            field: { 
                label: "Allow new content", 
                hint: "If false, no content will be allowed to be created or moved under content of this content type (e.g. prevents child content under media)" 
            },
            rules: [],
            i18n: false
        },

        // Others
        occurrences: {
            componentName: "component-input-fields-occurrences",
            field: { 
                label: "Occurrences", 
                hint: "" 
            },
            rules: [],
            i18n: false
        },

    }

    return {
        body: { map },
        contentType: 'application/json'
    }
}