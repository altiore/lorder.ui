import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { openDialog } from '@store/dialog';
import { showWarning } from '@store/notifications';
import { openTaskModal, startUserWork, stopUserWork } from '@store/tasks';

import { styles } from './styles';
import { TaskComponentTsx } from './TaskComponent';

const mapDispatch = {
  openDialog,
  openTaskModal,
  push,
  showWarning,
  startUserWork,
  stopUserWork,
};

export const TaskComponent = connect(
  undefined,
  mapDispatch
)(withStyles(styles, { withTheme: true })(TaskComponentTsx));
