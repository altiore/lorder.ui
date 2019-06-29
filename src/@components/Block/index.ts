import { withStyles } from '@material-ui/core/styles';

import { BlockTsx } from './Block';
import { styles } from './styles';

export const Block = withStyles(styles, { withTheme: true })(BlockTsx);
