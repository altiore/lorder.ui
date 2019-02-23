import { withStyles } from '@material-ui/core';

import { BackGroundImageTsx } from './BackGroundImage';
import { styles } from './styles';

export const BackGroundImage = withStyles(styles, { withTheme: true })(BackGroundImageTsx);
