import { connect } from 'react-redux';

import { push } from 'connected-react-router';

import { openDialog } from '#/@store/dialog';
import { showWarning } from '#/@store/notifications';
import { openTaskModal } from '#/@store/tasks';
import { startUserWork, stopUserWork } from '#/@store/user-works';

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
)(TaskComponentTsx);
