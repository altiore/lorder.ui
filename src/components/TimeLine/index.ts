import { withStyles } from '@material-ui/core/styles';

import { withResize } from '../../hocs/withResize';
import { styles } from './styles';
import { TimeLineTsx } from './TimeLine';

export const TimeLine = withResize(withStyles(styles, { withTheme: true })(TimeLineTsx));
