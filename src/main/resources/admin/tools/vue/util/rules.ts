import { error } from "./messages";

const validateRegex = (input: string) => {
  let isValid = true;

  try {
    new RegExp(input);
  } catch (e) {
    isValid = false;
  }

  return isValid;
};

export default {
  requiredText: (v: string) => v !== "" || error.rules.required,
  requiredArray: (v: Array<any>) =>
    v.filter((x) => !!x).length > 0 || error.rules.required,
  validRegex: (v: string) => validateRegex(v) || error.rules.validRegex,
  noSpaces: (v: string) => (v && v.indexOf(" ") === -1) || error.rules.noSpaces,
  numbersOnly: (v: number) => !isNaN(v) || error.rules.numbersOnly,
  numberNotNegative: (v: number) =>
    (!isNaN(v) && v >= 0) || error.rules.numberNonNegative,
};
