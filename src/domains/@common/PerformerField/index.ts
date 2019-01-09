import { withStyles } from '@material-ui/core/styles';

import { PerformerFieldTsx } from './PerformerField';
import { styles } from './styles';

export const PerformerField = withStyles(styles, { withTheme: true })(PerformerFieldTsx);
