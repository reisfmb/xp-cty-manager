import map from "./mapElementComponent";

export const innerPath = (path: (string | number)[], index: number) => [
  ...path,
  "elements",
  index,
];
export const getComponentProps = (elementName: string) => map[elementName];

export interface IGf {
  innerPath: typeof innerPath;
  getComponentProps: typeof getComponentProps;
}
