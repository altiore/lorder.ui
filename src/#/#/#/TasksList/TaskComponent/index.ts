import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { openDialog } from '#/@store/dialog';
import { showWarning } from '#/@store/notifications';
import { getTaskById, openTaskModal } from '#/@store/tasks';
import { startUserWork } from '#/@store/user-works';

import { TaskComponentTsx } from './TaskComponent';

interface ITaskComponentOwn {
  isCurrent: boolean;
  taskId: number | string;
  project: any;
}

const mapStateToProps = createStructuredSelector({
  getTaskById,
} as any);

const mapDispatch = {
  openDialog,
  openTaskModal,
  push,
  showWarning,
  startUserWork,
};

export default connect<any, any, ITaskComponentOwn>(
  mapStateToProps as any,
  mapDispatch
)(TaskComponentTsx);
