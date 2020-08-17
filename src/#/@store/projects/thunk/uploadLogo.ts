import { routePublicProjectUuid } from '#/@store/router';

import { uploadLogoAct } from '../actions';
import { getProjectByUuid } from '../selectors';

export const uploadLogo = file => async (dispatch, getState) => {
  try {
    const uuid = routePublicProjectUuid(getState());
    if (uuid) {
      const project = getProjectByUuid(getState())(uuid);
      if (!project.id) {
        throw new Error('Информацию о проекте не удалось найти среди проектов доступных для редактирования');
      }
      await dispatch(uploadLogoAct(file, project.id));
    } else {
      throw new Error('Uuid проекта не был найти в текущем роуте');
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
  }
};
