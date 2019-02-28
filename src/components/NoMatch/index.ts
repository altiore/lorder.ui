import { withStyles } from '@material-ui/core/styles';

import { NoMatchTsx } from './NoMatch';
import { styles } from './styles';

export const NoMatch = withStyles(styles, { withTheme: true })(NoMatchTsx);
