import { withStyles } from '@material-ui/core';

import { styles } from './styles';
import { TaskCardTsx } from './TaskCard';

export const TaskCard = withStyles(styles, { withTheme: true })(TaskCardTsx);
