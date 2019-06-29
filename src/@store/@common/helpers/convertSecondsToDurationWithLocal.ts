import moment from 'moment';

// TODO: simplify conversion. No need moment here!
export function convertSecondsToDurationWithLocal(seconds: number): string {
  const m = moment.utc(seconds * 1000);
  if (seconds < 60) {
    return m.format('sс');
  }
  if (seconds < 3600) {
    return m.format('mмин sс');
  }
  return Math.floor(m.unix() / 3600) + ` ч ${m.format('mмин')}`;
}
