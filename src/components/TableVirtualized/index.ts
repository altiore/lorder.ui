import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { TableVirtualized } from './TableVirtualized';

export default withStyles(styles, { withTheme: true })(TableVirtualized);
