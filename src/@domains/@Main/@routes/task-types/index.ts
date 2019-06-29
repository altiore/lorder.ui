import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { deleteTaskType, getAllTaskTypes, postTaskType, taskTypeList } from '@store/task-types';
import { styles } from './styles';
import { TaskTypesTsx } from './TaskTypes';

const mapState = createStructuredSelector({
  // findUserById,
  list: taskTypeList,
} as any);

const mapDispatch = {
  deleteTaskType,
  getAllTaskTypes,
  postTaskType,
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles, { withTheme: true })(TaskTypesTsx));
