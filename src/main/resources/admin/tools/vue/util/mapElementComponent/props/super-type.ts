import { IComponentProps } from '../type';

export default {
  component: 'TextInput',
  field: {
    label: 'Super Type',
    hint: 'Refers to the root controller of the form. For custom content types this should typically be set to base:structured.',
  },
  fallbackValue: 'base:structured',
  rules: ['requiredText'],
  i18n: false,
} as IComponentProps;
