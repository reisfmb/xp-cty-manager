import { IComponentProps } from '../type';

export default {
  component: 'OptionsInput',
  field: {
    label: 'Alignment',
    hint: 'Defines placement of checkbox relative to label text. Supported values are: left, right, top, bottom. Default is left.',
  },
  options: {
    items: [
      { text: 'Left', value: 'left' },
      { text: 'Right', value: 'right' },
      { text: 'Top', value: 'top' },
      { text: 'Bottom', value: 'bottom' },
    ],
    config: {
      multiple: false,
    },
  },
  rules: [],
  i18n: false,
} as IComponentProps;
