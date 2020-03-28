import { reducer as notifications } from 'react-notification-system-redux';

import { createTransform, PersistConfig, persistReducer } from 'redux-persist';

import { History } from 'history';
import * as localForage from 'localforage';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { DownloadList } from './@common/entities';
import { asyncReducersReducer } from './asyncReducers/reducer';
import counterReducer from './counter/reducer';
import { dialog } from './dialog';
import { externalLibraries } from './externalLibraries/reducer';
import { feedback } from './feedback/reducer';
import { highcharts } from './highcharts/reducer';
import { identity } from './identity';
import { info } from './info/reducer';
import { other } from './other/reducer';
import { project } from './project';
import { Project } from './projects';
import { projects } from './projects';
import { publicAltiore } from './publicAltiore/reducer';
import { publicProject } from './publicProject';
import { roles } from './roles/reducer';
import { UserRole } from './roles/UserRole';
import { routerReducer } from './router/reducer';
import { socketsReducer } from './sockets/reducer';
import { statistics } from './statistics/reducer';
import { taskActive } from './task-active/reducer';
import { taskStatusMoves } from './task-status-moves/reducer';
import { TaskStatusMove } from './task-status-moves/TaskStatusMove';
import { taskStatuses } from './task-statuses/reducer';
import { TaskStatus } from './task-statuses/TaskStatus';
import { TaskType } from './task-types';
import { taskTypes } from './task-types';
import { Task, UserWork } from './tasks';
import { tasks } from './tasks/reducer';
import { tasksFilter } from './tasksFilter/reducer';
import { timer } from './timer';
import { uiReducer } from './ui';
import { userWorks } from './user-works';
import { versionHistory } from './versionHistory';

import { IState } from '@types';

localForage.config({
  description: 'Altiore contribution version 1.0',
  name: 'altiore',
  storeName: 'contribution',
  version: 1.0,
});

const VARIANT_ENTITY: any = {
  projects: Project,
  roles: UserRole,
  tasks: Task,
  taskStatuses: TaskStatus,
  taskStatusMoves: TaskStatusMove,
  taskTypes: TaskType,
  userWorks: UserWork,
};

const persistConfig: PersistConfig<Partial<IState>> = {
  blacklist: [
    'asyncReducers',
    'dialog',
    'externalLibraries',
    'form',
    'highcharts',
    'router',
    'taskActive',
    'timer',
    'notifications',
    'publicProject',
    'versionHistory',
  ],
  key: 'altiore',
  storage: localForage,
  transforms: [
    createTransform(
      // transform state on its way to being serialized and persisted.
      (inboundState, key) => {
        // convert mySet to an Array.
        return inboundState;
      },
      // transform state being rehydrated
      (outboundState, key) => {
        const entity = VARIANT_ENTITY[key];
        if (!entity) {
          throw new Error(`Could not find entity class name for reducer: '${key.toString()}'!`);
        }
        return new DownloadList(entity, outboundState);
      },
      // define which reducers this transform gets called for.
      {
        whitelist: ['projects', 'roles', 'taskStatuses', 'taskStatusMoves', 'taskTypes', 'tasks', 'userWorks', 'users'],
      }
    ),
  ],
};

// TODO: fix async loading for reducers considering user role
export async function createRootReducer(history: History, asyncReducers = {}) {
  return persistReducer(
    persistConfig,
    combineReducers({
      /** common reducers */
      asyncReducers: asyncReducersReducer,
      counter: counterReducer,
      dialog,
      externalLibraries,
      form,
      highcharts,
      identity,
      info,
      notifications,
      publicAltiore,
      publicProject,
      roles,
      router: routerReducer(history),
      sockets: socketsReducer,
      statistics,
      ui: uiReducer,
      versionHistory,
      /** end common reducers */

      feedback,
      other,
      project,
      projects,
      taskActive,
      tasks,
      tasksFilter,
      taskStatuses,
      taskStatusMoves,
      taskTypes,
      timer,
      userWorks,

      ...asyncReducers,
    })
  );
}
