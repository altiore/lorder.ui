import { withStyles } from '@material-ui/core';

import { BackGroundVideoTsx } from './BackGroundVideo';
import { styles } from './styles';

export const BackGroundVideo = withStyles(styles, { withTheme: true })(BackGroundVideoTsx);
