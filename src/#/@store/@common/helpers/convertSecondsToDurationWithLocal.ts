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
  const mUnix = m.unix();
  if (seconds < 28800) {
    return Math.floor(mUnix / 3600) + `ч ${m.format('mмин')}`;
  }
  return Math.floor(mUnix / 28800) + 'дн ' + Math.floor((mUnix % 28800) / 3600) + `ч ${m.format('mмин')}`;
}
