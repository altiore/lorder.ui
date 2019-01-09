import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PerformerField as PerformerFieldRaw } from 'src/domains/@common/PerformerField';
import { getSelectedProjectTaskById, patchProjectTask } from 'src/store/projects';

const mapStateToProps = createStructuredSelector({
  getSelectedProjectTaskById,
});

const mapDispatchToProps = {
  patchProjectTask,
};

const mergeProps = (
  { getSelectedProjectTaskById, ...restState }: any,
  { patchProjectTask, ...restDispatch }: any,
  { projectId, taskId, ...restOwn }: any
) => ({
  ...restState,
  ...restDispatch,
  ...restOwn,
  patchProjectTask: (users: number[]) => patchProjectTask({ projectId, id: taskId, users }),
  projectMembers: getSelectedProjectTaskById(taskId) || [],
  // projectMembers: [],
});

export const PerformerField = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PerformerFieldRaw);
