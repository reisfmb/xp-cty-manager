export interface IComponentProps {
  component: string;
  fallbackValue?: string | number | boolean;
  path?: (string | number)[];
  attributes?: string[];
  rules?: string[];
  i18n?: boolean;
  field?: {
    label: string;
    hint: string;
  };
}

export type IMap = {
  [key: string]: IComponentProps;
};
