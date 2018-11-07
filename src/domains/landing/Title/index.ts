import { withStyles } from '@material-ui/core';

import { styles } from './styles';
import { TitleTsx } from './Title';

export const Title = withStyles(styles, { withTheme: true })(TitleTsx);
