import { updateProjectAct } from '../actions';
import { Project } from '../Project';
import { openedProject } from '../selectors';

export const updateProject = (data: Partial<Project>) => async (dispatch, getState) => {
  try {
    const project = openedProject(getState());
    if (project && project.id) {
      await dispatch(updateProjectAct(project.id, data));
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
  }
};
