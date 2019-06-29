import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PerformerField as PerformerFieldRaw } from '@domains/@common/PerformerField';
import { patchProjectTask, projectMembersAsUsers } from '@store/projects';
import { routeProjectId } from '@store/router';

const mapStateToProps = createStructuredSelector({
  projectId: routeProjectId,
  projectMembers: projectMembersAsUsers,
} as any);

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

export const PerformerField = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PerformerFieldRaw);
