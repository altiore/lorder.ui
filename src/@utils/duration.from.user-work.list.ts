import moment from 'moment';

import { IUserWork } from '@types';

/**
 * Возвращает продолжительность в секундах
 */
export function durationFromUserWorkList(
  list: IUserWork[],
  currentTimerSeconds,
  startTime: moment.Moment,
  endTime: moment.Moment = moment()
): number {
  return list.reduce((res, userWork: IUserWork) => {
    const curStart = userWork.startAt.diff(startTime, 'second') >= 0 ? userWork.startAt : startTime;
    const curFinish = endTime.diff(userWork.finishAt || moment(), 'second') >= 0 ? userWork.finishAt : endTime;
    if (curFinish) {
      return res + curFinish.diff(curStart, 'second');
    } else {
      return res + currentTimerSeconds;
    }
  }, 0);
}
