import map from './mapElementComponent';

export const innerPath = (path: string[], index: number) => [...path, 'elements', index.toString()];
export const getComponentProps = (elementName: string) => map[elementName];

export interface IGf {
    innerPath: typeof innerPath,
    getComponentProps: typeof getComponentProps,
}

