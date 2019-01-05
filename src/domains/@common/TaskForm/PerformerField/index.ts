import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PerformerFieldTsx } from 'src/domains/@common/PerformerField';
import { patchProjectTask } from 'src/store/projects';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {
  patchProjectTask,
};

const mergeProps = (
  { ...restState }: any,
  { patchProjectTask, ...restDispatch }: any,
  { projectId, taskId, ...restOwn }: any
) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
  patchProjectTask: (users: number[]) => patchProjectTask({ projectId, id: taskId, users }),
  projectMembers: [],
});

export const PerformerField = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PerformerFieldTsx);
