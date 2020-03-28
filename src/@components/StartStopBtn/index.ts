import { withStyles } from '@material-ui/core/styles';

import { StartStopBtnTsx } from './StartStopBtn';
import { styles } from './styles';

import { withResize } from '@hooks/withResize';

export const StartStopBtn = withResize(withStyles(styles, { withTheme: true })(StartStopBtnTsx));
