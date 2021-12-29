export interface IComponentProps {
    component: string,
    field?: {
        label: string,
        hint: string,
    }
    rules?: string[],
    i18n?: boolean,
    path?: string[],
}

export type IMap = {
    [key:string]: IComponentProps
};