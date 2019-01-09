import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PerformerField as PerformerFieldRaw } from 'src/domains/@common/PerformerField';
import { patchProjectTask, projectMembersAsUsers } from 'src/store/projects';
import { projectId } from 'src/store/router';

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
)(PerformerFieldRaw);
