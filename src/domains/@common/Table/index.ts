import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { TableTsx } from './Table';

export const Table = withStyles(styles, { withTheme: true })(TableTsx);
