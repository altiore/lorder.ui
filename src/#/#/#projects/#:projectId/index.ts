import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { closeDialog, openDialog } from '#/@store/dialog';
import { fetchProjectDetails, openedProject } from '#/@store/projects';

import { ProjectTsx } from './Project';
import { styles } from './styles';

const mapState = createStructuredSelector({
  openedProject,
} as any);

const mapDispatch = {
  closeDialog,
  fetchProjectDetails,
  goTo: push,
  openDialog,
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(ProjectTsx));
