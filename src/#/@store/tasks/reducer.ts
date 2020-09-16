import get from 'lodash/get';
import { Action, ActionMeta, handleActions } from 'redux-actions';
import { IRequestAction } from 'redux-actions-api';
import { PURGE } from 'redux-persist';

import { User } from '#/#/@store/users';
import { DownloadList } from '#/@store/@common/entities';
import { combineActions } from '#/@store/@common/helpers';
import { deleteTaskComments, postTaskComment } from '#/@store/task-comments';
import {
  bringBackAct,
  createAndStartUserWork,
  getUserWorksAct,
  patchAndStopUserWork,
  patchUserWork,
  pauseUserWork,
  startUserWorkAct,
} from '#/@store/user-works';

import { AxiosResponse } from 'axios';

import {
  archiveTaskA,
  clearAllProjectTask,
  fetchProjectTasksA,
  fetchTaskDetailsA,
  getAllTasks,
  moveProjectTaskAct,
  patchProjectTask,
  postProjectTask,
  updateProjectTask,
} from './actions';
import { Task } from './Task';

interface IProjectRequest extends IRequestAction<Partial<Task>> {
  sequenceNumber: number;
  projectId: number;
  prevStatus?: number;
  users: User[];
}

type S = DownloadList<Task>;
type P<T = any> = AxiosResponse<T> | Array<Partial<Task>>;

const getAllTasksHandler = (state: S, { payload }) => {
  const projectId = payload?.projectId;
  const skip = payload?.request?.params?.skip;
  const force = payload?.force;
  if (!skip && projectId && force) {
    return state.filter(el => el.projectId !== projectId).startLoading();
  }
  return state.startLoading();
};

const getAllTasksSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  return state.finishLoading(payload);
};

const getAllTasksFailHandler = (state: S) => {
  return state.stopLoading();
};

const postAndStartUserWorkHandler = (state: S, action: ActionMeta<any, any>) => {
  const sequenceNumber: number = get(action.payload, 'sequenceNumber');
  const projectId: number = get(action.payload, 'projectId');

  const index = state.list.findIndex(el => projectId === el.projectId && el.sequenceNumber === sequenceNumber);
  if (~index) {
    return state.startLoading();
  }
  const data: Partial<Task> = get(action, 'payload.request.data');
  return state.startLoading().addItem({
    description: data.description,
    id: 0,
    projectId: data.projectId,
    status: 2,
    title: data.title,
  });
};

const postAndStartUserWorkSuccessHandler = (state: S, action: ActionMeta<any, any>) => {
  let resState = state;
  let sequenceNumber: number;
  let projectId: number;
  // if meta exists get taskId from meta
  if (action.meta) {
    projectId = get(action.meta, 'previousAction.payload.projectId');
    sequenceNumber = get(action.meta, 'previousAction.payload.sequenceNumber');
  }
  const task: Partial<Task> = get(action, 'payload.data.started.task');
  const finishedTasks = get(action, ['payload', 'data', 'finished'], []);
  finishedTasks.forEach(finishedUserWork => {
    const finishedIndex = resState.list.findIndex(el => finishedUserWork.taskId === el.id);
    if (~finishedIndex) {
      resState = resState.updateItem(finishedIndex, finishedUserWork.task);
    }
  });
  const index = state.list.findIndex(el => projectId === el.projectId && sequenceNumber === el.sequenceNumber);
  if (~index) {
    return resState.stopLoading().updateItem(index, task);
  }
  return resState.stopLoading().updateItem(0, task);
};

const postAndStartUserWorkFailHandler = (state: S, action: ActionMeta<any, any>) => {
  let sequenceNumber: number;
  let projectId: number;
  if (action.meta) {
    projectId = get(action.meta, 'previousAction.payload.projectId');
    sequenceNumber = get(action.meta, 'previousAction.payload.sequenceNumber');
  }
  const index = state.list.findIndex(el => projectId === el.projectId && sequenceNumber === el.sequenceNumber);
  if (~index) {
    return state.stopLoading();
  }
  return state.stopLoading().removeItem(0);
};

const postProjectTaskHandler = (state: S, { payload }: Action<IProjectRequest>) => {
  const data = payload && payload.request.data;
  return state.startLoading().addItem(new Task({ id: 0, userTasks: [], ...data }));
};

const postProjectTaskSuccessHandler = (state: S, { payload }: Action<AxiosResponse>) => {
  const index = state.list.findIndex(el => el.id === 0);
  if (index !== -1) {
    return state.stopLoading().updateItem(index, payload && payload.data);
  }

  return state.stopLoading();
};

const postProjectTaskFailHandler = (state: S) => {
  const index = state.list.findIndex(el => el.id === 0);
  if (index !== -1) {
    state.stopLoading().removeItem(index);
  }

  return state.stopLoading();
};

const patchAndStopUserWorkHandler = (state: S, action: ActionMeta<any, any>) => {
  let taskId: number;
  if (action.meta) {
    taskId = get(action.meta, 'previousAction.payload.taskId');
  } else {
    taskId = get(action.payload, 'taskId');
  }
  const index = state.list.findIndex(el => taskId === el.id);
  if (~index) {
    return state.startLoading();
  }
  return state.startLoading();
};

const patchAndStopUserWorkSuccessHandler = (state: S, action: ActionMeta<any, any>) => {
  const { next, previous } = get(action, ['payload', 'data']);
  let resState: S = state;
  const nextIndex = resState.list.findIndex(el => next.taskId === el.id);
  if (!~nextIndex) {
    resState = resState.addItem(next.task);
  } else {
    resState = resState.updateItem(nextIndex, next.task);
  }
  const prevIndex = resState.list.findIndex(el => previous.taskId === el.id);
  if (!~prevIndex) {
    resState = resState.addItem(previous.task);
  } else {
    resState = resState.updateItem(prevIndex, previous.task);
  }
  return resState.stopLoading();
};

const patchAndStopUserWorkFailHandler = (state: S) => {
  return state.stopLoading();
};

const patchProjectTaskHandler = (state: S) => {
  return state.startLoading();
};

const patchProjectTaskSuccessHandler = (state: S, { payload, meta }) => {
  const newId = get(payload, ['data', 'id']);
  const index = state.list.findIndex(el => el.id === newId);
  if (index === -1) {
    throw new Error('Обновленный элемент не был найден');
  }
  return state.stopLoading().updateItem(index, payload.data);
};

const patchProjectTaskFailHandler = (state: S, action) => {
  const task = get(action, ['error', 'response', 'data', 'task']);
  if (!task) {
    return state.stopLoading();
  }
  const taskIndex = state.list.findIndex(el => get(task, 'id') === el.id);
  if (!~taskIndex) {
    return state;
  }
  return state.stopLoading().updateItem(taskIndex, task);
};

const moveProjectTaskHandler = (state: S, { payload }: Action<P>) => {
  const taskIndex = state.list.findIndex(
    el => get(payload, 'sequenceNumber') === el.sequenceNumber && get(payload, 'projectId') === el.projectId
  );
  const statusTypeName = get(payload, 'request.data.statusTypeName');
  if (taskIndex !== -1) {
    return state
      .updateItem(taskIndex, {
        statusTypeName,
      })
      .startLoading();
  }
  return state.startLoading();
};

const moveProjectTaskSuccessHandler = (state: S, { payload }) => {
  const index = state.list.findIndex(el => el.id === payload?.data?.id);
  if (index === -1) {
    return state.startLoading();
  }
  return state.updateItem(index, payload?.data).stopLoading();
};

const moveProjectTaskFailHandler = (state: S, { meta }: ActionMeta<any, { previousAction: { payload } }>) => {
  const taskIndex = state.list.findIndex(
    el =>
      meta.previousAction.payload.sequenceNumber === el.sequenceNumber &&
      meta.previousAction.payload.projectId === el.projectId
  );
  const prevStatusTypeName = meta.previousAction.payload.prevStatusTypeName;
  return state
    .updateItem(taskIndex, {
      statusTypeName: prevStatusTypeName,
    })
    .stopLoading();
};

const deleteProjectTaskHandler = (state: S) => {
  return state.startLoading();
};

const deleteProjectTaskSuccessHandler = (state: S, { meta }) => {
  const projectId = meta?.previousAction?.payload?.projectId;
  const seqNumber = meta?.previousAction?.payload?.sequenceNumber;
  const index = state.list.findIndex(t => t.projectId === projectId && t.sequenceNumber === seqNumber);
  if (index !== -1) {
    return state.stopLoading().updateItem(index, { isArchived: true });
  }

  return state.stopLoading();
};

const deleteProjectTaskFailHandler = (state: S) => {
  return state.stopLoading();
};

const fetchTaskDetailsHandler = (state: S) => {
  return state.startLoading();
};

const fetchTaskDetailsSuccessHandler = (state: S, { payload }: Action<P>) => {
  const index = state.list.findIndex(el => el.id === get(payload, ['data', 'id']));
  const taskWithDetails = { ...get(payload, 'data'), isDetailsLoaded: true };
  if (~index) {
    return state.updateItem(index, taskWithDetails).stopLoading();
  }
  return state.addItem(taskWithDetails).stopLoading();
};

const fetchTaskDetailsFailHandler = (state: S) => {
  // TODO: implement revert back to previous state
  return state.stopLoading();
};

const patchUserWorkSuccessHandler = (state: S, { payload }) => {
  let resState = state;
  const edited = get(payload, ['data', 'edited']);
  const editedIndex = resState.list.findIndex(el => el.id === edited.taskId);
  if (editedIndex !== -1 && edited.task) {
    resState = resState.updateItem(editedIndex, edited.task);
  }

  const removed = get(payload, ['data', 'removed'], []);
  removed.forEach(removedUserWork => {
    const removedIndex = resState.list.findIndex(el => removedUserWork.taskId === el.id);
    if (removedIndex !== -1 && removedUserWork.task) {
      resState = resState.updateItem(removedIndex, removedUserWork.task);
    }
  });

  const touched = get(payload, ['data', 'touched'], []);
  touched.forEach(touchedUserWork => {
    const touchedIndex = resState.list.findIndex(el => touchedUserWork.taskId === el.id);
    if (touchedIndex !== -1 && touchedUserWork.task) {
      resState = resState.updateItem(touchedIndex, touchedUserWork.task);
    }
  });

  return resState;
};

const logOutHandler = () => {
  return new DownloadList(Task);
};

const updateProjectTaskHandler = (state, { payload: task }) => {
  if (!task) {
    throw new Error('updateProjectTaskHandler Error: payload is required and MUST be task entity');
  }
  const taskIndex = state.list.findIndex(el => get(task, 'id') === el.id);
  if (!~taskIndex) {
    return state;
  }
  return state.updateItem(taskIndex, task);
};

const getUserWorksSuccess = (state, { payload }) => {
  const preparedData = {
    data: get(payload, 'data', []).map(el => el.task),
  };
  return state.finishLoading(preparedData);
};

const addTaskCommentSuccess = (state, { payload }) => {
  const taskIndex = state.list.findIndex(el => el.id === payload?.data?.taskId);
  if (!~taskIndex) {
    return state;
  }
  return state.updateItem(taskIndex, { commentsCount: state.list[taskIndex].commentsCount + 1 });
};

const deleteTaskCommentsSuccess = (state, { payload, meta }) => {
  const taskIndex = state.list.findIndex(el => el.id === meta?.previousAction?.payload?.taskId);
  if (!~taskIndex) {
    return state;
  }
  return state.updateItem(taskIndex, { commentsCount: state.list[taskIndex].commentsCount - 1 });
};

const bringBackActSuccess = (state, { payload }) => {
  const taskIndex = state.list.findIndex(el => el.id === payload?.data?.task?.id);
  let resState: S = state;
  if (~taskIndex) {
    resState = resState.updateItem(taskIndex, payload?.data?.task);
  }
  const nextTask = payload?.data?.stopResponse?.next?.task;
  if (nextTask) {
    resState = resState.addItem(nextTask);
  }

  return resState;
};

export const tasks: any = handleActions<S, any, any>(
  {
    [combineActions(getAllTasks.toString(), fetchProjectTasksA.toString())]: getAllTasksHandler,
    [combineActions(getAllTasks.success, fetchProjectTasksA.success)]: getAllTasksSuccessHandler,
    [combineActions(getAllTasks.fail, fetchProjectTasksA.fail)]: getAllTasksFailHandler,

    [combineActions(createAndStartUserWork.toString(), startUserWorkAct.toString())]: postAndStartUserWorkHandler,
    [combineActions(createAndStartUserWork.success, startUserWorkAct.success)]: postAndStartUserWorkSuccessHandler,
    [combineActions(createAndStartUserWork.fail, startUserWorkAct.fail)]: postAndStartUserWorkFailHandler,

    [postProjectTask.toString()]: postProjectTaskHandler,
    [postProjectTask.success]: postProjectTaskSuccessHandler,
    [postProjectTask.fail]: postProjectTaskFailHandler,

    [combineActions(patchAndStopUserWork.toString(), pauseUserWork.toString()).toString()]: patchAndStopUserWorkHandler,
    [combineActions(patchAndStopUserWork.success, pauseUserWork.success)]: patchAndStopUserWorkSuccessHandler,
    [combineActions(patchAndStopUserWork.fail, pauseUserWork.fail)]: patchAndStopUserWorkFailHandler,

    [patchProjectTask.toString()]: patchProjectTaskHandler,
    [patchProjectTask.success]: patchProjectTaskSuccessHandler,
    [patchProjectTask.fail]: patchProjectTaskFailHandler,

    [moveProjectTaskAct.toString()]: moveProjectTaskHandler,
    [moveProjectTaskAct.success]: moveProjectTaskSuccessHandler,
    [moveProjectTaskAct.fail]: moveProjectTaskFailHandler,

    [archiveTaskA.toString()]: deleteProjectTaskHandler,
    [archiveTaskA.success]: deleteProjectTaskSuccessHandler,
    [archiveTaskA.fail]: deleteProjectTaskFailHandler,

    [fetchTaskDetailsA.toString()]: fetchTaskDetailsHandler,
    [fetchTaskDetailsA.success]: fetchTaskDetailsSuccessHandler,
    [fetchTaskDetailsA.fail]: fetchTaskDetailsFailHandler,

    [patchUserWork.success]: patchUserWorkSuccessHandler,

    [combineActions(PURGE, clearAllProjectTask)]: logOutHandler,

    [updateProjectTask.toString()]: updateProjectTaskHandler,

    [getUserWorksAct.success]: getUserWorksSuccess,

    [postTaskComment.success]: addTaskCommentSuccess,
    [deleteTaskComments.success]: deleteTaskCommentsSuccess,
    [bringBackAct.success]: bringBackActSuccess,
  },
  new DownloadList(Task)
);
