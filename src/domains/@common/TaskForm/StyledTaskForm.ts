import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import { TaskFormJsx } from './TaskForm';

export const TaskForm = withStyles(styles, { withTheme: true })(TaskFormJsx);
