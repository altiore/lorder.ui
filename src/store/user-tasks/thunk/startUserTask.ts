// import Timer = NodeJS.Timer;
import { Dispatch } from 'react-redux';

import { IUserTaskData, postUserTask } from '../actions';
// import { IUserTaskData, postUserTask, tickUserTaskTimer } from '../actions';

// let timer: Timer;

export const startUserTask = (data: IUserTaskData) => async (dispatch: Dispatch) => {
  // clearInterval(timer);
  console.log('startuserTask', data);
  if (!data.title) {
    data.title = `Задача для проекта ${data.projectId}`;
  }
  const res = await dispatch(postUserTask(data));
  console.log('response after save userTask', res);
  return res;
  // timer = setInterval(() => dispatch(tickUserTaskTimer(res)), 1000);
};
