import { withStyles } from '@material-ui/core/styles';

import { SelectMenuFieldTsx } from './SelectMenuField';
import { styles } from './styles';

export const SelectMenuField = withStyles(styles, { withTheme: true })(SelectMenuFieldTsx) as any;
