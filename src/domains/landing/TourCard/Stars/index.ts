import { withStyles } from '@material-ui/core/styles';

import { StarsTsx } from './Stars';
import { styles } from './styles';

export const Stars = withStyles(styles, { withTheme: true })(StarsTsx);
