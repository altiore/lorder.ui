import * as moment from 'moment';

// TODO: simplify conversion. No need moment here!
export function convertSecondsToDuration(seconds: number): string {
  const m = moment.utc(seconds * 1000);
  const hours = Math.floor(m.unix() / 3600);
  return hours ? hours + m.format(':mm:ss') : m.format('mm:ss');
}
