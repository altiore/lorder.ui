import { withStyles } from '@material-ui/core/styles';

import { HoverInfoTsx } from './HoverInfo';
import { styles } from './styles';

export const HoverInfo = withStyles(styles, { withTheme: true })(HoverInfoTsx);
