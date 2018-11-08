import { withStyles } from '@material-ui/core/styles';

import { PageJsx } from './Page';
import { styles } from './styles';

export const Page = withStyles(styles, { withTheme: true })(PageJsx);
