import { withStyles } from '@material-ui/core/styles';

import { NoMatchTsx } from './no-match';
import { styles } from './styles';

export const NoMatch = withStyles(styles, { withTheme: true })(NoMatchTsx);
