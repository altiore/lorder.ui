import { getUserWorksSuccessSaga } from '#/@store/user-works/saga/getUserWorkSuccess';
import { patchAndStopUserWorkSuccessSaga } from '#/@store/user-works/saga/patchAndStopUserWork';

import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([patchAndStopUserWorkSuccessSaga(), getUserWorksSuccessSaga()]);
}
