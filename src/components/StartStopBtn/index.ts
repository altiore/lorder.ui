import { withStyles } from '@material-ui/core/styles';

import { withResize } from 'src/hocs/withResize';
import { StartStopBtnTsx } from './StartStopBtn';
import { styles } from './styles';

export const StartStopBtn = withResize(withStyles(styles, { withTheme: true })(StartStopBtnTsx));
