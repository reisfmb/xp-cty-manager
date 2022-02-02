import { IComponentProps } from '../type';

export default {
  component: 'BooleanInput',
  field: {
    label: 'Allow child content',
    hint: 'If false, no content will be allowed to be created or moved under content of this content type (e.g. prevents child content under media)',
  },
  rules: [],
  i18n: false,
} as IComponentProps;
