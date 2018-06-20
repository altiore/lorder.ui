import { withStyles } from '@material-ui/core/styles';

import { New as NewJsx } from './New';
import { styles } from './styles';

export const New = withStyles(styles, { withTheme: true })(NewJsx);
