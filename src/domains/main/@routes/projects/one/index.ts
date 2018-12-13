import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { fetchProjectDetails, openedProject } from 'src/store/projects';
import { ProjectTsx } from './Project';
import { styles } from './styles';

const mapState = createStructuredSelector({
  openedProject,
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
