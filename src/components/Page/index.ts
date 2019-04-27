import { withStyles } from '@material-ui/core/styles';

import { withResize } from 'hocs/withResize';
import { PageJsx } from './Page';
import { styles } from './styles';

export const Page = withResize(withStyles(styles, { withTheme: true })(PageJsx));
