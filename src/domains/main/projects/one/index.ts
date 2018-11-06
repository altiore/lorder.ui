import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { fetchProjectDetails } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { ProjectJsx } from './Project';
import { styles } from './styles';

const mapState = createStructuredSelector({
  projectId,
});

const mapDispatch = {
  closeDialog,
  fetchProjectDetails,
  openDialog,
};

export const Project = connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(ProjectJsx));
