import { IComponentProps } from './type';

export default {
    component: "TextInput",
    field: { 
        label: "Display Name", 
        hint: "The human readable name of the content type. Optionally specify the i18n attribute to define a mapping to localize the value. The localisation key must then be declared and localised in the resource bundle." 
    },
    rules: ['requiredText'],
    i18n: true
} as IComponentProps