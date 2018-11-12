import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { startUserWork, stopUserWork } from 'src/store/tasks';
import { styles } from './styles';
import { TaskComponentTsx } from './TaskComponent';

const mapDispatch = {
  startUserWork,
  stopUserWork,
};

export const TaskComponent = connect(
  undefined,
  mapDispatch
)(withStyles(styles, { withTheme: true })(TaskComponentTsx));
