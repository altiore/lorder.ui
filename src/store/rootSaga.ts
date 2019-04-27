import { all } from 'redux-saga/effects';

import { patchAndStopUserWorkSuccessSaga } from 'store/tasks/user-works/saga/patchAndStopUserWork';
import { getUserWorksSuccessSaga } from 'store/user-works/saga/getUserWorkSuccess';

export function* rootSaga() {
  yield all([patchAndStopUserWorkSuccessSaga(), getUserWorksSuccessSaga()]);
}
