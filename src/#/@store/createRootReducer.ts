import { intlReducer as intl } from 'react-intl-redux';
import { reducer as notifications } from 'react-notification-system-redux';

import { History } from 'history';
import * as localForage from 'localforage';
import { combineReducers, Reducer } from 'redux';
import { reducer as form } from 'redux-form';
import { createMigrate, createTransform, PersistConfig, persistReducer } from 'redux-persist';

import { DownloadList } from './@common/entities';
import { asyncReducersReducer } from './asyncReducers/reducer';
import counterReducer from './counter/reducer';
import { dialog } from './dialog';
import { externalLibraries } from './externalLibraries/reducer';
import { feedback } from './feedback/reducer';
import { identity } from './identity';
import { info } from './info/reducer';
import { other } from './other/reducer';
import { projectStatusMovesReducer } from './project-status-moves/reducer';
import { StatusMove } from './project-status-moves/StatusMove';
import { projectReducer } from './project/reducer';
import { Project } from './projects';
import { projects } from './projects';
import { ProjectPub } from './projects-pub';
import projectsPub from './projects-pub/reducer';
import { publicLorder } from './publicLorder/reducer';
import { publicProject } from './publicProject';
import { roles } from './roles/reducer';
import { UserRole } from './roles/UserRole';
import { routerReducer } from './router/reducer';
import { socketsReducer } from './sockets/reducer';
import { statistics } from './statistics/reducer';
import { taskActive } from './task-active/reducer';
import { taskStatuses } from './task-statuses/reducer';
import { TaskStatus } from './task-statuses/TaskStatus';
import { TaskType } from './task-types';
import { taskTypes } from './task-types';
import { Task } from './tasks';
import { tasks } from './tasks/reducer';
import { tasksFilter } from './tasksFilter/reducer';
import { timer } from './timer';
import { Ui } from './ui';
import { uiReducer } from './ui/reducer';
import { UserWork } from './user-works';
import { userWorks } from './user-works/reducer';
import { versionHistory } from './versionHistory';
import { webHooks } from './webhooks/reducer';

import { IState } from '@types';

const migrations = {
  0: state => {
    // фильтры задач меняются со строк на числовые значения
    return {
      ...state,
      tasksFilter: { ...state.tasksFilter, openedStatuses: [] },
    };
  },
  1: state => {
    // фильтры задач меняются с чисел на строковые значения
    return {
      ...state,
      tasksFilter: { ...state.tasksFilter, openedStatuses: [] },
    };
  },
  2: state => {
    return {
      ...state,
      projectsPub: new DownloadList(ProjectPub),
    };
  },
  3: state => {
    return {
      ...state,
      ui: new Ui(state?.ui),
    };
  },
};

localForage.config({
  description: 'Lorder contribution version 3.0',
  name: 'lorder',
  storeName: 'contribution',
  version: 3.0,
});

const VARIANT_ENTITY: any = {
  projects: Project,
  projectsPub: ProjectPub,
  projectStatusMoves: StatusMove,
  roles: UserRole,
  tasks: Task,
  taskStatuses: TaskStatus,
  taskTypes: TaskType,
  userWorks: UserWork,
};

const persistConfig: PersistConfig<Partial<IState>> = {
  blacklist: [
    'asyncReducers',
    'dialog',
    'externalLibraries',
    'form',
    'router',
    'taskActive',
    'timer',
    'notifications',
    'publicProject',
    'versionHistory',
  ],
  key: 'lorder',
  migrate: createMigrate(migrations, { debug: false }),
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
        whitelist: [
          'projects',
          'projectsPub',
          'roles',
          'taskStatuses',
          'projectStatusMoves',
          'taskTypes',
          'tasks',
          'userWorks',
          'users',
        ],
      }
    ),
  ],
  version: 1,
};

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
      identity,
      info,
      intl,
      notifications: notifications as any,
      publicLorder,
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
      project: projectReducer,
      projects,
      projectsPub,
      projectStatusMoves: projectStatusMovesReducer,
      taskActive,
      tasks,
      tasksFilter,
      taskStatuses,
      taskTypes,
      timer,
      userWorks,
      webHooks,
      ...asyncReducers,
    }) as Reducer<Partial<IState>>
  );
}
