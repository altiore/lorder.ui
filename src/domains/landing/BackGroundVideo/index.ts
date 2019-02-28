import { withStyles } from '@material-ui/core/styles';

import { BackGroundVideoTsx } from './BackGroundVideo';
import { styles } from './styles';

export const BackGroundVideo = withStyles(styles, { withTheme: true })(BackGroundVideoTsx);
