import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAllProjectTasks, projectTasks } from 'src/store/projects';
import { projectId } from 'src/store/router';
import { DragAndDrop } from './DragAndDrop';
import { styles } from './styles';

const mapState = createStructuredSelector({
  items: projectTasks,
  projectId,
});

const mapDispatch = {
  getAllProjectTasks,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { getAllProjectTasks, ...restDispatch }: any,
  { match, ...restOwn }: any
) => ({
  ...restState,
  ...restDispatch,
  getAllProjectTasks: () => getAllProjectTasks(projectId),
  projectId,
  ...restOwn,
});

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(withStyles(styles, { withTheme: true })(DragAndDrop));
