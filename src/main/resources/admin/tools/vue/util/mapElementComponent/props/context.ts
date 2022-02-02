import { IComponentProps } from '../type';

export default {
  component: 'BooleanInput',
  field: {
    label: 'Context',
    hint: 'True limits the list of content types to the applications configured for the current site. Default is false.',
  },
  rules: [],
  i18n: false,
} as IComponentProps;
