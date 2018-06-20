import { withStyles } from '@material-ui/core/styles';

import { Projects as ProjectsJsx } from './Projects';
import { styles } from './styles';

export const Projects = withStyles(styles, { withTheme: true })(ProjectsJsx);
