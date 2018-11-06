import * as moment from 'moment';

// TODO: simplify conversion. No need moment here!
export function covertSecondsToDuration(seconds: number): string {
  const m = moment.utc(seconds * 1000);
  return Math.floor(m.unix() / 3600) + m.format(':mm:ss');
}
