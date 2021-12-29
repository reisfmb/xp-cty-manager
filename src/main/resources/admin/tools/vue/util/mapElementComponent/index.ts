import { IMap } from './type';

import ContentTypeProps from './content-type';
import DisplayNameProps from './display-name';
import DisplayNameExpressionProps from './display-name-expression';
import DisplayNameLabelProps from './display-name-label';

export default {
    ['content-type']: ContentTypeProps,
    ['display-name']: DisplayNameProps,
    ['display-name-expression']: DisplayNameExpressionProps,
    ['display-name-label']: DisplayNameLabelProps
} as IMap;