import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { TaskTsx } from './Task';

export default withStyles(styles, { withTheme: true })(TaskTsx);
