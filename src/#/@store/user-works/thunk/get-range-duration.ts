import { convertSecondsToHours } from '#/@store/@common/helpers';
import { currentTimerTime } from '#/@store/timer';
import { currentRange } from '#/@store/ui';

import { getUserWorksInRange } from '../selectors';

import { durationFromUserWorkList } from '@utils/duration.from.user-work.list';

export const getRangeDuration = () => async (dispatch: any, getState: any) => {
  const state = getState();
  const curRange = currentRange(state);
  const filteredEvents = getUserWorksInRange(state)(...curRange);
  const curTime = currentTimerTime(state);
  if (Array.isArray(filteredEvents)) {
    return convertSecondsToHours(durationFromUserWorkList(filteredEvents, curTime, ...curRange));
  }

  return '0c';
};
