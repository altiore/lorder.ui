import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { UserTsx } from './User';

export const User = withStyles(styles, { withTheme: true })(UserTsx);
