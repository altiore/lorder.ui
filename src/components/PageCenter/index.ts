import { withStyles } from '@material-ui/core/styles';

import { PageCenterJsx } from './PageCenter';
import { styles } from './styles';

export const PageCenter = withStyles(styles, { withTheme: true })(PageCenterJsx);
