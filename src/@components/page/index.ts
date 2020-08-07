import { withStyles } from '@material-ui/core/styles';

import { PageJsx } from './page';
import { styles } from './styles';

import { withResize } from '@hooks/with-resize';

export const Page = withResize(withStyles(styles, { withTheme: true })(PageJsx));
