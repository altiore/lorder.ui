import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { selectedProject } from 'src/store/projects';
import { ProjectJsx } from './Project';
import { styles } from './styles';

const mapState = createStructuredSelector({
  project: selectedProject,
});

const mapDispatch = {
  closeDialog,
  openDialog,
};

export const Project = connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(ProjectJsx));
