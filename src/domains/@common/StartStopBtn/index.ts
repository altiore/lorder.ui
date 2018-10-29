import { withStyles } from '@material-ui/core/styles';

import { StartStopBtnTsx } from './StartStopBtn';
import { styles } from './styles';

export const StartStopBtn = withStyles(styles, { withTheme: true })(StartStopBtnTsx);
