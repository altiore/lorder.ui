import { withStyles } from '@material-ui/core/styles';

import { ProjectButtonTsx } from './ProjectButton';
import { styles } from './styles';

export const ProjectButton = withStyles(styles, { withTheme: true })(ProjectButtonTsx);
