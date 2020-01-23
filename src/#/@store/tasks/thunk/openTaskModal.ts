import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';

import { IState, ITask } from '@types';
import { showError } from '#/@store/notifications';
import { currentTask } from '#/@store/timer';

export const openTaskModal = (task?: ITask, count = 0) => async (
  dispatch: ThunkDispatch<any, any, any>,
  getState: () => IState
) => {
  if (task) {
    dispatch(
      push({
        pathname: `/projects/${task.projectId}/tasks/${task.sequenceNumber}`,
        state: {
          modal: true,
          projectId: task.projectId,
          taskId: task.id,
          sequenceNumber: task.sequenceNumber,
        },
      })
    );
  } else {
    setTimeout(() => {
      const openedTask = currentTask(getState());
      if (openedTask) {
        dispatch(
          push({
            pathname: `/projects/${openedTask.projectId}/tasks/${openedTask.sequenceNumber}`,
            state: {
              modal: true,
              projectId: openedTask.projectId,
              taskId: openedTask.id,
              sequenceNumber: openedTask.sequenceNumber,
            },
          })
        );
      } else {
        if (count > 4) {
          dispatch(
            showError({
              message: 'Не удалось открыть задачу',
            })
          );
        } else {
          dispatch(openTaskModal(undefined, count + 1) as any);
        }
      }
    }, 600);
  }
};
