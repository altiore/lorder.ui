import { handleActions } from 'redux-actions';

import { DownloadList } from '#/@store/@common/entities';
import { nothing, removeFromList } from '#/@store/@reducers';

import { createProjectPartAct, deleteProjectPartAct, fetchProjectPartsAct } from './actions';
import { ProjectPart } from './project-part';

const fetchProjectPartsSuccessHandler = (state, { payload }) => {
  return state.replaceAll(payload);
};

const createProjectPartActSuccessHandler = (state, { payload }) => {
  return state.addItem(payload.data);
};

export const projectParts = handleActions<any, any, any>(
  {
    [fetchProjectPartsAct.toString()]: nothing,
    [fetchProjectPartsAct.success]: fetchProjectPartsSuccessHandler,
    [fetchProjectPartsAct.fail]: nothing,

    [createProjectPartAct.toString()]: nothing,
    [createProjectPartAct.success]: createProjectPartActSuccessHandler,
    [createProjectPartAct.fail]: nothing,

    [deleteProjectPartAct.toString()]: nothing,
    [deleteProjectPartAct.success]: removeFromList('parts'),
    [deleteProjectPartAct.fail]: nothing,
  },
  new DownloadList(ProjectPart)
);
