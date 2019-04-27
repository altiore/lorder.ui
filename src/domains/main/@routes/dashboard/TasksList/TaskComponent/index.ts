import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { openDialog } from 'store/dialog';
import { startUserWork, stopUserWork } from 'store/tasks';
import { styles } from './styles';
import { TaskComponentTsx } from './TaskComponent';

const mapDispatch = {
  openDialog,
  push,
  startUserWork,
  stopUserWork,
};

export const TaskComponent = connect(
  undefined,
  mapDispatch
)(withStyles(styles, { withTheme: true })(TaskComponentTsx));
