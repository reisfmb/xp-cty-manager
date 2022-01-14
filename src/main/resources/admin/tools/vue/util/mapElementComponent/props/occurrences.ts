import { IComponentProps } from '../type';

export default {
  component: 'TextAttributeInput',
  field: { label: 'Occurrences' },
  attributes: ['minimum', 'maximum'],
  rules: ['requiredText', 'noSpaces', 'numbersOnly', 'numberNotNegative'],
} as IComponentProps;
