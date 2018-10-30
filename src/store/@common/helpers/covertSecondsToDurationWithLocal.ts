import * as moment from 'moment';

export function covertSecondsToDurationWithLocal(seconds: number): string {
  const m = moment.utc(seconds * 1000);
  if (seconds < 60) {
    return m.format('s сек');
  }
  if (seconds < 3600) {
    return m.format('m мин s сек');
  }
  return m.format('H ч m мин');
}
