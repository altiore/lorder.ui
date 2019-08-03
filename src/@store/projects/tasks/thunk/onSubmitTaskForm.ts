import { patchProjectTask } from '../actions';

export const onSubmitTaskForm = async (values, dispatch, { projectId }) => {
  return await dispatch(patchProjectTask({ ...values, projectId }));
};
