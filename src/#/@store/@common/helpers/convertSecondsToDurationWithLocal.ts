import moment from 'moment';

// TODO: simplify conversion. No need moment here!
/**
 *
 * @param seconds
 * @param hoursPerDay - can be 24 > hoursPerDay > 1, because of working day duration make sense in such interval
 */
export function convertSecondsToDurationWithLocal(seconds: number, hoursPerDay: number = 24): string {
  if (hoursPerDay > 24) {
    throw new Error(
      'В расчетном дне не может быть больше 24 часов. Расчетный день не может быть длиннее реального дня'
    );
  }
  const m = moment.utc(seconds * 1000);
  const secondsInAMinute = 60;
  if (seconds < secondsInAMinute) {
    return m.format('sс');
  }
  const secondsInAHour = secondsInAMinute * 60;
  if (seconds < secondsInAHour) {
    return m.format('mмин sс');
  }
  const mUnix = m.unix();
  const secondsInADay = secondsInAHour * hoursPerDay;
  if (seconds < secondsInADay) {
    return Math.floor(mUnix / 3600) + `ч ${m.format('mмин')}`;
  }

  return (
    Math.floor(mUnix / secondsInADay) + 'дн ' + Math.floor((mUnix % secondsInADay) / 3600) + `ч ${m.format('mмин')}`
  );
}

export function convertSecondsToHours(seconds: number): string {
  const m = moment.utc(seconds * 1000);
  const secondsInAMinute = 60;
  if (seconds < secondsInAMinute) {
    return m.format('sс');
  }
  const secondsInAHour = secondsInAMinute * 60;
  if (seconds < secondsInAHour) {
    return m.format('mмин sс');
  }
  const mUnix = m.unix();

  const hours = Math.round(mUnix / 360) / 10;
  if (hours > 23) {
    return `${hours}ч`;
  }

  return Math.floor(mUnix / 3600) + `ч ${m.format('mмин')}`;
}
