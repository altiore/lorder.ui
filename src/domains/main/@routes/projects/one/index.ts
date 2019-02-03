import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { fetchProjectDetails, selectedProject } from 'src/store/projects';
import { ProjectTsx } from './Project';
import { styles } from './styles';

const mapState = createStructuredSelector({
  selectedProject,
});

const mapDispatch = {
  closeDialog,
  fetchProjectDetails,
  goTo: push,
  openDialog,
};

export const Project = connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(ProjectTsx));
