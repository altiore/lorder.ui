import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from 'src/hocs/withResize';
import { closeDialog, openDialog } from 'src/store/dialog';
import { logOut, userAvatar, userEmail, userRole } from 'src/store/identity';
import { openedProject, ownProjectListWithStatistic, selectedProject } from 'src/store/projects';
import { startUserWork } from 'src/store/tasks';
import { HeaderTsx } from './Header';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  openedProject,
  projects: ownProjectListWithStatistic,
  selectedProject,
  userAvatar,
  userEmail,
  userRole,
});

const mapDispatchToProps = {
  closeDialog,
  logOut,
  openDialog,
  push,
  startUserWork,
};

export const Header = connect<any, any, {}>(
  mapStateToProps,
  mapDispatchToProps
)(withResize(withStyles(styles, { withTheme: true })(HeaderTsx)));
