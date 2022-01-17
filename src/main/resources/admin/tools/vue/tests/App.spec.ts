/* eslint-disable no-use-before-define */
import Vue from 'vue';
import Vuetify from 'vuetify';
import { render, fireEvent } from '@testing-library/vue';
import { Element } from '@reginaldlee/xml-js';
import store from '../store/index';
import * as gf from '../util/globalFunctions';
import ctyToBeLoaded from './cty';

import App from '../App.vue';

Vue.config.productionTip = false;
Vue.prototype.$gf = gf;
Vue.use(Vuetify);

// @ts-ignore
const renderWithVuetify = (component) => {
  const root = document.createElement('div');
  root.setAttribute('data-app', 'true');

  return render(
    component,
    {
      container: document.body.appendChild(root),
      vuetify: new Vuetify(),
      store,
    },
  );
};

test('Click on New button should set initial state of content type.', async () => {
  window.showDirectoryPicker = jest.fn();
  window.showOpenFilePicker = jest.fn();

  const appWrapper = renderWithVuetify(App);

  await fireEvent.click(appWrapper.getByTestId('v-btn__new'));

  const contentTypeDefinitionElements:Array<Element> = store.getters['ModuleContentType/getContentTypeByPath'](['elements', 0, 'elements']);

  const needToHave = [
    'display-name',
    'display-name-label',
    'display-name-expression',
    'description',
    'super-type',
    'is-abstract',
    'is-final',
    'is-built-in',
    'allow-child-content',
    'form',
  ];

  needToHave.forEach((elName: string) => {
    const el = contentTypeDefinitionElements.find((el:Element) => el.name === elName);
    expect(el?.name).toBe(elName);
  });
});

test('Click on Add should add new element to the form of the content type.', async () => {
  const appWrapper = renderWithVuetify(App);

  await fireEvent.click(appWrapper.getByTestId('v-btn__new'));
  await fireEvent.click(appWrapper.getByText('Select element'));
  await fireEvent.click(appWrapper.getByText('AttachmentUploader'));
  await fireEvent.click(appWrapper.getByTestId('v-btn__addSchema'));

  expect(getFormElements().length).toBe(1);
});

test('Click on Duplicate should duplicate existing element to the form of the content type.', async () => {
  window.scrollTo = jest.fn();

  const appWrapper = renderWithVuetify(App);

  expect(getFormElements().length).toBe(1);

  await fireEvent.click(appWrapper.getByTestId('v-btn__duplicate'));

  const formElements = getFormElements();

  expect(formElements.length).toBe(2);
  expect(formElements[1].attributes?.name).toBe(`${formElements[0].attributes?.name}-2`);
  expect(JSON.stringify(formElements[0].elements) === JSON.stringify(formElements[1].elements)).toBe(true);
});

test('Click on Move Up should properly move up the element in the content type.', async () => {
  const appWrapper = renderWithVuetify(App);

  let formElements = getFormElements();

  const moveUpButtons = appWrapper.getAllByTestId('v-btn__moveUp');

  expect(formElements[0].attributes?.name).toBe('myattachmentuploader');
  expect(formElements[1].attributes?.name).toBe('myattachmentuploader-2');

  await fireEvent.click(moveUpButtons[moveUpButtons.length - 1]);
  formElements = getFormElements();

  expect(formElements[0].attributes?.name).toBe('myattachmentuploader-2');
  expect(formElements[1].attributes?.name).toBe('myattachmentuploader');
});

test('Click on Move Down should properly move down the element in the content type.', async () => {
  const appWrapper = renderWithVuetify(App);

  let formElements = getFormElements();

  const moveDownButtons = appWrapper.getAllByTestId('v-btn__moveDown');

  expect(formElements[0].attributes?.name).toBe('myattachmentuploader-2');
  expect(formElements[1].attributes?.name).toBe('myattachmentuploader');

  await fireEvent.click(moveDownButtons[0]);
  formElements = getFormElements();

  expect(formElements[0].attributes?.name).toBe('myattachmentuploader');
  expect(formElements[1].attributes?.name).toBe('myattachmentuploader-2');
});

test('Click on Remove should remove element in the form of the content type.', async () => {
  window.scrollTo = jest.fn();

  const appWrapper = renderWithVuetify(App);

  expect(getFormElements().length).toBe(2);

  const numberOfRemoveButtons = appWrapper.getAllByTestId('v-btn__remove').length;
  for (let i = 0; i < numberOfRemoveButtons; i += 1) {
    await fireEvent.click(appWrapper.getAllByTestId('v-btn__remove')[0]);
    await fireEvent.click(document.getElementsByClassName('swal2-confirm')[0]);
  }

  expect(getFormElements().length).toBe(0);
});

test('Click on Load button should set state of content type.', async () => {
  renderWithVuetify(App);

  // Here it's not testing the click since it'd be necessary to have
  // mocks for file system api functions, but instead it's testing
  // what the load button triggers, the setContentTypeFromXmlString from
  // the Content Type Module.

  const xmlAsString = ctyToBeLoaded;

  store.dispatch('ModuleContentType/setContentTypeFromXmlString', xmlAsString);

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((x) => setTimeout(x, 200));

  const contentTypeDefinitionElements:Array<Element> = store.getters['ModuleContentType/getContentTypeByPath'](['elements', 0, 'elements']);

  const needToHaveInDefinitions = [
    'display-name',
    'display-name-label',
    'display-name-expression',
    'description',
    'super-type',
    'is-abstract',
    'is-final',
    'is-built-in',
    'allow-child-content',
    'form',
  ];

  needToHaveInDefinitions.forEach((elName: string) => {
    const el = contentTypeDefinitionElements.find((el:Element) => el.name === elName);
    expect(el?.name).toBe(elName);
  });

  const needToHaveInForm = [
    'TextLine',
    'HtmlArea',
    'ContentSelector',
  ];

  needToHaveInForm.forEach((elName: string) => {
    const el = getFormElements().find((el:Element) => el?.attributes?.type === elName);
    expect(el?.attributes?.type).toBe(elName);
  });
});

function getFormElements() {
  const contentTypeDefinitionElements:Array<Element> = store.getters['ModuleContentType/getContentTypeByPath'](['elements', 0, 'elements']);
  const form:Element = contentTypeDefinitionElements.find((el:Element) => el.name === 'form') || {} as Element;
  const formElements: Array<Element> = form.elements || [];

  return formElements;
}
