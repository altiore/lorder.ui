import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { patchProjectTask, projectMembersAsUsers } from 'src/store/projects/index';
import { projectId } from 'src/store/router/index';
import { PerformersCellJsx } from './PerformersCell';
import { styles } from './styles';

const mapStateToProps = createStructuredSelector({
  projectId,
  projectMembers: projectMembersAsUsers,
});

const mapDispatchToProps = {
  patchProjectTask,
};

const mergeProps = (
  { projectId, ...restState }: any,
  { patchProjectTask, ...restDispatch }: any,
  { taskId, ...restOwn }: any
) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
  patchProjectTask: (users: number[]) => patchProjectTask({ projectId, id: taskId, users }),
});

export const PerformersCell = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(withStyles(styles, { withTheme: true })(PerformersCellJsx));
