import { handleActions } from 'redux-actions';

import { DownloadList } from '#/@store/@common/entities';
import { nothing, removeFromList } from '#/@store/@reducers';

import { createProjectPartAct, deleteProjectPartAct, fetchProjectPartsAct, updateProjectPartAct } from './actions';
import { ProjectPart } from './project-part';

const fetchProjectPartsSuccessHandler = (state, { payload }) => {
  return state.replaceAll(payload);
};

const createProjectPartActSuccessHandler = (state, { payload }) => {
  return state.addItem(payload.data);
};

const updateProjectPartSuccessHandler = (state, { payload }) => {
  const elIdx = state.list.findIndex(el => el.id === payload?.data?.id);
  if (elIdx !== -1) {
    return state.updateItem(elIdx, payload.data);
  }

  return state;
};

export const projectParts = handleActions<any, any, any>(
  {
    [fetchProjectPartsAct.toString()]: nothing,
    [fetchProjectPartsAct.success]: fetchProjectPartsSuccessHandler,
    [fetchProjectPartsAct.fail]: nothing,

    [createProjectPartAct.toString()]: nothing,
    [createProjectPartAct.success]: createProjectPartActSuccessHandler,
    [createProjectPartAct.fail]: nothing,

    [updateProjectPartAct.toString()]: nothing,
    [updateProjectPartAct.success]: updateProjectPartSuccessHandler,
    [updateProjectPartAct.fail]: nothing,

    [deleteProjectPartAct.toString()]: nothing,
    [deleteProjectPartAct.success]: removeFromList('parts'),
    [deleteProjectPartAct.fail]: nothing,
  },
  new DownloadList(ProjectPart)
);
