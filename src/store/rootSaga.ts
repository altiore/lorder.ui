import { all } from 'redux-saga/effects';

import { patchAndStopUserWorkSuccessSaga } from 'src/store/tasks/user-works/saga/patchAndStopUserWork';
import { getUserWorksSuccessSaga } from 'src/store/user-works/saga/getUserWorkSuccess';

export function* rootSaga() {
  yield all([patchAndStopUserWorkSuccessSaga(), getUserWorksSuccessSaga()]);
}
