import { updateProjectAct } from '../actions';
import { Project } from '../Project';
import { openedProject } from '../selectors';

export const updateProject = (data: Partial<Project>) => async (dispatch, getState) => {
  const project = openedProject(getState());
  if (project && project.id) {
    await dispatch(updateProjectAct(project.id, data));
  }
};
