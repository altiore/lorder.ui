import { updateProjectAct } from '../actions';
import { openedProject } from '../selectors';
import { Project } from '../Project';

export const updateProject = (data: Partial<Project>) => async (dispatch, getState) => {
  const project = openedProject(getState());
  if (project && project.id) {
    await dispatch(updateProjectAct(project.id, data));
  }
};
