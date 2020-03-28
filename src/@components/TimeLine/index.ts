import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { TimeLineTsx, Y_HEIGHT_BIG } from './TimeLine';

import { withResize } from '@hooks/withResize';

export const TimeLine = withResize(withStyles(styles, { withTheme: true })(TimeLineTsx));
export const TIME_LINE_HEIGHT = Y_HEIGHT_BIG;
