import get from 'lodash/get';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';
import moment from 'moment';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectId, userId } from '#/@store/identity/selectors';
import { getProjectById } from '#/@store/projects/selectors';
import { routeProjectId } from '#/@store/router';
import { Task } from '#/@store/tasks/Task';
import { filteredMembers, projectId, projectPart, searchTerm, tasksFilter } from '#/@store/tasksFilter';
import { currentTask, currentTaskId } from '#/@store/timer';
import { isPaused, lastUserWorks } from '#/@store/user-works/selectors';

import { TASK_FILTER_TYPE } from '../tasksFilter/TasksFilter';
import { allTaskList, getTaskById, getTaskBySequenceNumber } from './selectors';

import { ACCESS_LEVEL, IDownloadList, IEvent, ITask, IUserWork } from '@types';

export const filteredByPerformerTasks = createDeepEqualSelector(
  [allTaskList, userId, currentTaskId],
  (taskList, currentUserId, taskId) =>
    currentUserId ? taskList.filter(el => el.performerId === currentUserId && el.id !== taskId) : []
);

export const allTaskLength = createDeepEqualSelector([allTaskList], list => (list ? list.length : 0));

const filteredFunction: {
  [key in TASK_FILTER_TYPE]: (a: any, b: any) => 1 | -1 | 0;
} = {
  new: (a: ITask, b: ITask) => (a.id > b.id ? -1 : 1),
  recent: (a: ITask, b: ITask) => (a.id < b.id ? -1 : 1),
  smart: (a: ITask, b: ITask) => (a.value > b.value ? -1 : 1),
};

export const sortedByFilterTasks = createDeepEqualSelector(
  [filteredByPerformerTasks, lastUserWorks, tasksFilter],
  (tasks = [], userWorks, filter = TASK_FILTER_TYPE.SMART) => {
    if (filter === TASK_FILTER_TYPE.RECENT) {
      const sortedUserWorks = uniq(
        get(userWorks, 'list', [])
          .slice(0)
          .sort((a, b) => {
            return (a.finishAt || moment()).diff(b.finishAt || moment()) > 0 ? -1 : 1;
          })
          .map(el => el.taskId)
      );
      return tasks.slice(0).sort(function(a, b) {
        if (sortedUserWorks.indexOf(a.id) !== -1) {
          if (sortedUserWorks.indexOf(b.id) !== -1) {
            return sortedUserWorks.indexOf(a.id) - sortedUserWorks.indexOf(b.id) > 0 ? 1 : -1;
          } else {
            return -1;
          }
        } else {
          if (sortedUserWorks.indexOf(b.id) !== -1) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }
    return tasks.slice(0).sort(filteredFunction[filter]);
  }
);

export const sortedByFilterTasksWithActive = createDeepEqualSelector(
  [sortedByFilterTasks, searchTerm, currentTask, projectId, defaultProjectId],
  (tasks = [], sTerm = '', curTask, pId, defPId): Array<ITask | 'filter' | string | undefined> => {
    return [
      curTask,
      'filter',
      ...tasks.filter(
        t =>
          t.id !== get(curTask, 'id') &&
          includes([1, 2, 3], t.status) &&
          ~t.title.toLowerCase().indexOf(sTerm.trim().toLowerCase()) &&
          t.projectId !== defPId &&
          (!pId || t.projectId === pId)
      ),
    ];
  }
);

export const checkIsCurrent = createDeepEqualSelector([currentTaskId, isPaused], (cTaskId, taskIsPaused) => taskId =>
  cTaskId === taskId && !taskIsPaused
);

export const events = createDeepEqualSelector(
  [lastUserWorks, getTaskById, defaultProjectId],
  (userWorks: IDownloadList<IUserWork>, getTask, defPrId: number | undefined): IEvent[] => {
    return userWorks.list
      .filter(uw => moment().diff(uw.startAt, 'hours') <= 24)
      .sort((a, b) => (a.startAt.unix() > b.startAt.unix() ? 1 : -1))
      .map(userWork => {
        const task = getTask(userWork.taskId) as ITask;
        return {
          userWork,

          task,

          isActive: (userWork.projectId || (task && task.projectId)) !== defPrId,
          name: get(task, 'title', userWork.taskId.toString()),
        };
      });
  }
);

export const projectTasks = createDeepEqualSelector(
  [allTaskList, routeProjectId],
  (list, projectId: number | undefined): Task[] => (projectId ? list.filter(el => el.projectId === projectId) : [])
);

export const filteredProjectTasks = createDeepEqualSelector(
  [projectTasks, searchTerm, filteredMembers, projectPart],
  (list, sTerm = '', members = [], projectPart = '') => {
    if (!list || !list.length) {
      return [];
    }
    let res = list;

    if (projectPart === 0) {
      res = res.filter(({ projectParts }) => {
        return !projectParts || !projectParts.length;
      });
    }

    if (projectPart) {
      res = res.filter(({ projectParts }) => {
        return projectParts.map(({ id }) => id).includes(projectPart as number);
      });
    }

    if (sTerm) {
      res = res.filter(el => ~el.title.toLowerCase().indexOf(sTerm.trim().toLowerCase()));
    }

    if (members) {
      res = res.filter(el => (members.length ? includes(members, el.performerId) : true));
    }
    return res;
  }
);

export const canStartTask = createDeepEqualSelector(
  [getTaskBySequenceNumber, getProjectById, userId],
  (getTask, getProject, userId) => (sequenceNumber: number, projectId: number) => {
    const task: ITask = getTask(sequenceNumber, projectId) as ITask;
    if (task) {
      const project = getProject(task.projectId);
      return (
        task.performerId === userId ||
        Boolean(project && project.accessLevel && project.accessLevel >= ACCESS_LEVEL.YELLOW)
      );
    }

    return false;
  }
);

export const STATUS_NAMES = ['Резерв', 'Сделать', 'В процессе', 'Обзор', 'Готово'];

export const allStatuses = () => STATUS_NAMES;
