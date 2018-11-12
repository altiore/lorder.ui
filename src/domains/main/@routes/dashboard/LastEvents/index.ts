import { withStyles } from '@material-ui/core/styles';

import { LastEventsTsx } from './LastEvents';
import { styles } from './styles';

export const LastEvents = withStyles(styles, { withTheme: true })(LastEventsTsx);
