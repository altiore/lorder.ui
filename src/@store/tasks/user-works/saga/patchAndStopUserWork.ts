import { put, select, takeLatest } from 'redux-saga/effects';

import { getProjectById } from '@store/projects';
import { startTimer, UserWork } from '@store/tasks';
import { patchAndStopUserWork } from '../actions';

function* patchAndStopUserWorkSuccessHandler({ payload }: any) {
  try {
    const currentUserWork: Partial<UserWork> = payload.data.next;
    if (currentUserWork) {
      const project = (yield select(getProjectById))(currentUserWork.projectId);
      yield put(startTimer(currentUserWork, project) as any);
    }
  } catch (e) {
    throw new Error('patchAndStopUserWorkSuccessHandler.catch Error');
  }
}

export function* patchAndStopUserWorkSuccessSaga() {
  yield takeLatest(patchAndStopUserWork.success, patchAndStopUserWorkSuccessHandler);
}
