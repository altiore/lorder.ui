import { withStyles } from '@material-ui/core';

import { StarsTsx } from './Stars';
import { styles } from './styles';

export const Stars = withStyles(styles, { withTheme: true })(StarsTsx);
