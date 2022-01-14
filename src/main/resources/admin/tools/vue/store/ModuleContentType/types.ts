import * as xml2jsonConverter from '@reginaldlee/xml-js';

export interface IContentType extends xml2jsonConverter.ElementCompact {}

export interface IState {
  contentTypeAfterLastSave: IContentType | null;
  contentType: IContentType | null;
}
export type IAllowedValuesToBeAdded =
  | string
  | xml2jsonConverter.Element
  | Array<xml2jsonConverter.Element>;
