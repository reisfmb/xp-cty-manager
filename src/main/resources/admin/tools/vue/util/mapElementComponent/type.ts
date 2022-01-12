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
  options?: {
    items: Array<{ text: string; value: string }>;
    config: {
      multiple: boolean;
      joinWith?: string;
    };
  };
}

export type IMap = {
  [key: string]: IComponentProps;
};
