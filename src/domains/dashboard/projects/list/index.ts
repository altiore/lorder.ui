import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { getAllProjects, projectList } from 'src/store/projects';
import { Projects as ProjectsJsx } from './Projects';
import { styles } from './styles';

export const Projects = connect(
  createStructuredSelector({
    projectList,
  }),
  {
    closeDialog,
    getAllProjects,
    openDialog,
  },
)(withStyles(styles, { withTheme: true })(ProjectsJsx));
