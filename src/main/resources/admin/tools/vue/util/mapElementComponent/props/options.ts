import { IComponentProps } from '../type';

export default {
  component: 'TextAttributeInput',
  field: { label: 'Options' },
  attributes: ['minimum', 'maximum'],
  rules: ['requiredText', 'noSpaces', 'numbersOnly', 'numberNotNegative'],
} as IComponentProps;
