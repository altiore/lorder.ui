import { withStyles } from '@material-ui/core/styles';

import { FilterTsx } from './Filter';
import { styles } from './styles';

export const Filter = withStyles(styles, { withTheme: true })(FilterTsx);
