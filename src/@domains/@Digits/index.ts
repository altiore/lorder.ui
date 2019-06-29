import { withStyles } from '@material-ui/core/styles';

import { Digits as DigitsJsx } from './Digits';
import { styles } from './styles';

export const Digits = withStyles(styles, { withTheme: true })(DigitsJsx as any);
