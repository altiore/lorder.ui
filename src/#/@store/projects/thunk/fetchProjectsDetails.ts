import { fetchProjectDetails } from '../actions';
import { getProjectById } from '../selectors';

export const fetchProjectsDetails = (projectIds: number[]) => async (dispatch, getState) => {
  await Promise.all(
    projectIds.map(async projectId => {
      const pr = getProjectById(getState())(projectId);
      if (!pr || !pr.taskColumns || !pr.taskColumns.length) {
        await dispatch(fetchProjectDetails(projectId));
      }
    })
  );
};
