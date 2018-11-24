import * as moment from 'moment';

export function millisecondsToHours(milliseconds: number): number {
  const m = moment.utc(milliseconds);
  return Math.round(m.unix() / 360) / 10;
}
