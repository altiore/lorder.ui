import localforage from 'localforage';
import { combineReducers } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';

import stateReconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import { DownloadList } from '#/@store/@common/entities';
import { users } from './users/reducer';
import { User } from './users';

const VARIANT_ENTITY: any = {
  users: User,
};

const authorizedConfig: PersistConfig<any> = {
  key: 'authorized',
  stateReconciler,
  storage: localforage,
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
      { whitelist: ['users'] }
    ),
  ],
};

export const authorized = combineReducers({
  users,
});

export default {
  authorized: persistReducer(authorizedConfig, authorized),
};
