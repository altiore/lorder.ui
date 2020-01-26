import { History } from 'history';
import * as localForage from 'localforage';
import { reducer as notifications } from 'react-notification-system-redux';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { createTransform, PersistConfig, persistReducer } from 'redux-persist';

import { IState } from '@types';
import { DownloadList } from './@common/entities';
import { dialog } from './dialog';
import { highcharts } from './highcharts/reducer';
import { identity } from './identity';
import { info } from './info/reducer';
import { Project } from './projects';
import { publicAltiore } from './publicAltiore/reducer';
import { publicProject } from './publicProject';
import { routerReducer } from './router/reducer';
import { socketsReducer } from './sockets/reducer';
import { statistics } from './statistics/reducer';
import { TaskType } from './task-types';
import { Task, UserWork } from './tasks';
import { uiReducer } from './ui';
import { versionHistory } from './versionHistory';

import { externalLibraries } from './externalLibraries/reducer';
import { feedback } from './feedback/reducer';
import { other } from './other/reducer';
import { project } from './project';
import { projects } from './projects';
import { taskActive } from './task-active/reducer';
import { taskTypes } from './task-types';
import { tasks } from './tasks/reducer';
import { tasksFilter } from './tasksFilter/reducer';
import { timer } from './timer';
import { userWorks } from './user-works';

localForage.config({
  description: 'Altiore contribution version 1.0',
  name: 'altiore',
  storeName: 'contribution',
  version: 1.0,
});

const VARIANT_ENTITY: any = {
  projects: Project,
  taskTypes: TaskType,
  tasks: Task,
  userWorks: UserWork,
};

const persistConfig: PersistConfig = {
  blacklist: [
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
          throw new Error(`Could not find entity class name for reducer: '${key}'!`);
        }
        return new DownloadList(entity, outboundState);
      },
      // define which reducers this transform gets called for.
      { whitelist: ['projects', 'taskTypes', 'tasks', 'userWorks', 'users'] }
    ),
  ],
};

// TODO: fix async loading for reducers considering user role
export async function createRootReducer(history: History, asyncReducers = {}) {
  return persistReducer(
    persistConfig,
    combineReducers<Partial<IState>>({
      /** common reducers */
      dialog,
      externalLibraries,
      form,
      highcharts,
      identity,
      info,
      notifications,
      publicAltiore,
      publicProject,
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
      taskTypes,
      tasks,
      tasksFilter,
      timer,
      userWorks,

      ...asyncReducers,
    })
  );
}
