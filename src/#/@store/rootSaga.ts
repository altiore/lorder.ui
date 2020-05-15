import { all } from 'redux-saga/effects';

import { getUserWorksSuccessSaga } from '#/@store/user-works/saga/getUserWorkSuccess';
import { patchAndStopUserWorkSuccessSaga } from '#/@store/user-works/saga/patchAndStopUserWork';
import { pauseUserWorkSuccessSaga } from '#/@store/user-works/saga/pauseUserWork';

export function* rootSaga() {
  yield all([patchAndStopUserWorkSuccessSaga(), pauseUserWorkSuccessSaga(), getUserWorksSuccessSaga()]);
}
