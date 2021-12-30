import { error } from './messages';

export default {
    requiredText: (v: string) => v !== "" || error.rules.required,
    requiredArray: (v: Array<any>) => v.filter((x) => !!x).length > 0 || error.rules.required,
    noSpaces: (v: string) => v && v.indexOf(" ") === -1 || error.rules.noSpaces,
    numbersOnly: (v: number) => !isNaN(v) || error.rules.numbersOnly,
    numberNotNegative: (v: number) => (!isNaN(v) && v >= 0) || error.rules.numberNonNegative,
};