import { put, select, takeLatest } from 'redux-saga/effects';

import { getProjectById } from 'src/store/projects';
import { startTimer, UserWork } from 'src/store/tasks';
import { patchAndStopUserWork } from '../actions';

function* patchAndStopUserWorkSuccessHandler({ payload }: any) {
  try {
    const currentUserWork: Partial<UserWork> = payload.data.next;
    if (currentUserWork) {
      const project = (yield select(getProjectById))(currentUserWork.projectId);
      yield put(startTimer(currentUserWork, project) as any);
    }
  } catch (e) {
    console.log('patchAndStopUserWorkSuccessHandler.catch', e);
  }
}

export function* patchAndStopUserWorkSuccessSaga() {
  yield takeLatest(patchAndStopUserWork.success, patchAndStopUserWorkSuccessHandler);
}
