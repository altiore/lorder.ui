import { withStyles } from '@material-ui/core/styles';

import { SelectReactFieldJsx } from './SelectReactField';
import { styles } from './styles';

export const SelectReactField = withStyles(styles, { withTheme: true })(SelectReactFieldJsx);
export { ISelectReactFieldProps } from './SelectReactField';
