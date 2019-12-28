import { History } from 'history';
import * as localForage from 'localforage';
import { reducer as notifications } from 'react-notification-system-redux';
// import { routerReducer } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { reducer as form } from 'redux-form';
import { createTransform, PersistConfig, persistReducer } from 'redux-persist';

import { IState, ROLE } from '@types';
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
import { User } from './users';
import { versionHistory } from './versionHistory';

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
  users: User,
};

const persistConfig: PersistConfig = {
  blacklist: [
    'dialog',
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
export async function createRootReducer(history: History, role: ROLE = ROLE.GUEST) {
  let asyncReducers: Partial<Reducer<IState>> = {};
  switch (role) {
    case ROLE.ADMIN:
      asyncReducers = (await import('@store/adminReducers')).adminReducers;
      break;
    case ROLE.SUPER_ADMIN:
      asyncReducers = (await import('@store/adminReducers')).adminReducers;
      break;
    case ROLE.USER:
      asyncReducers = (await import('@store/userReducers')).userReducers;
      break;
    case ROLE.GUEST:
    default:
      asyncReducers = {};
      break;
  }
  return persistReducer(
    persistConfig,
    combineReducers<IState>({
      dialog,
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
      ...(asyncReducers as any),
    })
  );
}
