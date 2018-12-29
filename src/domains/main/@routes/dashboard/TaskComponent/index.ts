import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { withResize } from 'src/hocs/withResize';
import { openDialog } from 'src/store/dialog';
import { startUserWork, stopUserWork } from 'src/store/tasks';
import { styles } from './styles';
import { TaskComponentTsx } from './TaskComponent';

const mapDispatch = {
  openDialog,
  startUserWork,
  stopUserWork,
};

export const TaskComponent = connect(
  undefined,
  mapDispatch
)(withResize(withStyles(styles, { withTheme: true })(TaskComponentTsx)));
