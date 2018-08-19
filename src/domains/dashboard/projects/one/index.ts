import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { selectedProject } from 'src/store/projects';
import { ProjectJsx } from './Project';
import { styles } from './styles';

export const Project = connect(
  createStructuredSelector({
    project: selectedProject,
  }),
  {
    closeDialog,
    openDialog,
  }
)(withStyles(styles, { withTheme: true })(ProjectJsx));
