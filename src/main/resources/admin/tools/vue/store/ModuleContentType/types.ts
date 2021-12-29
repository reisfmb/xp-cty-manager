import * as xml2jsonConverter from '@reginaldlee/xml-js';

export interface IContentType extends xml2jsonConverter.ElementCompact{}

export interface IState {
  contentType: IContentType | null
}
