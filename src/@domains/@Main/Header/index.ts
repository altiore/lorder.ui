import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withResize } from '@hooks/withResize';
import { closeDialog, openDialog } from '@store/dialog';
import { logOut, userAvatar, userEmail, userRole } from '@store/identity';
import { showWarning } from '@store/notifications';
import { openedProject, ownProjectListWithStatistic, selectedProject } from '@store/projects';
import { openTaskModal, startUserWork } from '@store/tasks';
import { HeaderTsx } from './Header';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  openedProject,
  projects: ownProjectListWithStatistic,
  selectedProject,
  userAvatar,
  userEmail,
  userRole,
} as any);

const mapDispatchToProps = {
  closeDialog,
  logOut,
  openDialog,
  openTaskModal,
  push,
  showWarning,
  startUserWork,
};

export const Header = connect<any, any, {}>(
  mapStateToProps,
  mapDispatchToProps
)(withResize(withStyles(styles, { withTheme: true })(HeaderTsx)));
