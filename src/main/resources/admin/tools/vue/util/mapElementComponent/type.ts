export interface IComponentProps {
  component: string;
  initialValue?: string | number;
  path?: string[];
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
