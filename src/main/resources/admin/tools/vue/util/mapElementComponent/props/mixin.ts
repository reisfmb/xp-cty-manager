import { IComponentProps } from '../type';

export default {
  component: 'CardMixin',
  field: { label: 'Mixin' },
  attributes: ['name'],
  rules: ['requiredText', 'noSpaces'],
} as IComponentProps;
