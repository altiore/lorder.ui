import { put, select, takeLatest } from 'redux-saga/effects';

import { getProjectById } from 'src/store/projects';
import { startTimer, stopUserWork, UserWork } from 'src/store/tasks';
import { isTimerStarted } from 'src/store/timer';
import { getUserWorks } from '../actions';

function* getUserWorksSuccessHandler({ payload }: any) {
  try {
    const userWorkList = payload.data;
    const currentUserWork: Partial<UserWork> | undefined = userWorkList.find(
      (userWork: UserWork) => !userWork.finishAt
    );
    if (currentUserWork) {
      const project = (yield select(getProjectById))(currentUserWork.projectId);
      yield put(startTimer(currentUserWork, project) as any);
    } else {
      if (yield select(isTimerStarted)) {
        yield put(stopUserWork() as any);
      }
    }
  } catch (e) {
    throw new Error('getUserWorksSuccessHandler.catch Error');
  }
}

export function* getUserWorksSuccessSaga() {
  yield takeLatest(getUserWorks.success, getUserWorksSuccessHandler);
}
