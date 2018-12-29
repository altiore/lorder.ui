import { withStyles } from '@material-ui/core';

import { NoMatchTsx } from './NoMatch';
import { styles } from './styles';

export const NoMatch = withStyles(styles, { withTheme: true })(NoMatchTsx);
