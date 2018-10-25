import * as moment from 'moment';

export function covertSecondsToDuration(seconds: number): string {
  const m = moment.utc(seconds * 1000);
  return m.format('HH:mm:ss');
  // if (seconds < 3600) {
  //   return m.format('mm:ss') + ' мин';
  // } else {
  //   return m.format('HH:mm') + ' ч';
  // }
}
