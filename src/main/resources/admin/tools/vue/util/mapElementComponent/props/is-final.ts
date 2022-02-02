import { IComponentProps } from '../type';

export default {
  component: 'BooleanInput',
  field: {
    label: 'Is Final',
    hint: 'If true, it is not possible to create new content types that “extend” this.',
  },
  rules: [],
  i18n: false,
} as IComponentProps;
