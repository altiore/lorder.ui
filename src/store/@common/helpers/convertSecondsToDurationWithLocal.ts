import * as moment from 'moment';

// TODO: simplify conversion. No need moment here!
export function convertSecondsToDurationWithLocal(seconds: number): string {
  const m = moment.utc(seconds * 1000);
  if (seconds < 60) {
    return m.format('s сек');
  }
  if (seconds < 3600) {
    return m.format('m мин s сек');
  }
  return Math.floor(m.unix() / 3600) + ` ч ${m.format('m мин')}`;
}
