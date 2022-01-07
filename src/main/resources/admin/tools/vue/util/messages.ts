export const dialog = {
  selectCtyFolder: "Please select the content-types folder.",
  selectXml: "Please select a content type XML schema.",
  defineCtyName: "What is the name of the new content type?",
  loading: "Loading content type schema...",
  savedCty: "Your changes have been saved.",
};

export const error = {
  selectXml: "You need to select a content type XML schema to load it.",
  fileNotXml: "This is not a XML file.",
  saveXml: "Failed to save the content type schema.",
  folderNotCty: (selectedFolderName: string) =>
    `Please select the content-types folder, you've selected a folder named ${selectedFolderName}.`,
  rules: {
    required: "This field is required.",
    noSpaces: "This field does not allow spaces.",
    numbersOnly: "This field has to be a number.",
    numberNonNegative: "This field has to be a non negative number.",
  },
};
