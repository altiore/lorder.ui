import get from 'lodash/get';
import includes from 'lodash/includes';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import moment from 'moment';

import { createDeepEqualSelector } from '#/@store/@common/createSelector';
import { defaultProjectId, userId } from '#/@store/identity/selectors';
import { getProjectById, getPushForwardStatusesByProjectId } from '#/@store/projects/selectors';
import { routeProjectId, routeTaskSequenceNumber } from '#/@store/router';
import { Task } from '#/@store/tasks/Task';
import {
  filteredMembers,
  projectId,
  projectParts as selectedProjectParts,
  searchTerm,
  tasksFilter,
} from '#/@store/tasksFilter';
import { currentTask, currentTaskId } from '#/@store/timer';
import { isPaused, lastUserWorks } from '#/@store/user-works/selectors';

import { TASK_FILTER_TYPE } from '../tasksFilter/TasksFilter';
import { allTaskList, getTaskBySequenceNumber } from './selectors';

import { ACCESS_LEVEL, ITask } from '@types';

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
  [sortedByFilterTasks, searchTerm, currentTask, projectId, getPushForwardStatusesByProjectId, defaultProjectId],
  (tasks = [], sTerm = '', curTask, pId, getStatuses, defPId): Array<ITask | 'filter' | string | undefined> => {
    const res = [
      curTask,
      'filter',
      ...tasks.filter(
        t =>
          t.id !== get(curTask, 'id') &&
          includes(getStatuses(t.projectId), t.statusTypeName) &&
          ~t.title.toLowerCase().indexOf(sTerm.trim().toLowerCase()) &&
          t.projectId !== defPId &&
          (!pId || t.projectId === pId)
      ),
    ];
    console.log('sortedByFilterTasksWithActive', {
      tasks,
      res,
    });
    return res;
  }
);

export const isCurrent = createDeepEqualSelector(
  [currentTask, isPaused, routeProjectId, routeTaskSequenceNumber],
  (curTask, taskIsPaused, curPrId, curTaskSeqNum) =>
    curTask && curTask.projectId === curPrId && curTask.sequenceNumber === curTaskSeqNum && !taskIsPaused
);

export const projectTasks = createDeepEqualSelector(
  [allTaskList, routeProjectId],
  (list, prId: number | undefined): Task[] => (prId ? list.filter(el => el.projectId === prId) : [])
);

export const filteredProjectTasks = createDeepEqualSelector(
  [projectTasks, searchTerm, filteredMembers, selectedProjectParts],
  (list, sTerm = '', members = [], prParts = []) => {
    if (!list || !list.length) {
      return [];
    }
    let res = list;

    if (prParts && prParts.length) {
      res = res.filter(({ projectParts }) => {
        return Boolean(
          intersection(
            projectParts.map(({ id }) => id),
            prParts
          ).length
        );
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
  (getTask, getProject, uId) => (sequenceNumber: number, prId: number) => {
    const task: ITask = getTask(sequenceNumber, prId) as ITask;
    if (task) {
      const project = getProject(task.projectId);
      return (
        task.performerId === uId ||
        Boolean(project && project.accessLevel && project.accessLevel >= ACCESS_LEVEL.YELLOW)
      );
    }

    return true;
  }
);
