import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';
import MembersFieldRaw from '@domains/@common/MembersField';
import { patchProjectTask, projectMembersAsUsers } from '@store/projects';
import { routeProjectId } from '@store/router';

const mapStateToProps = createStructuredSelector<IState, { projectId?: number; projectMembers: any[] }>({
  projectId: routeProjectId,
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

export const MembersField = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MembersFieldRaw);
