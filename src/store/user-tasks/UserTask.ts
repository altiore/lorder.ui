import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import * as moment from 'moment';

import { covertSecondsToDuration } from 'src/store/@common/helpers';

export interface IUserTask {
  id?: number | string;
  description?: string;
  finishAt?: moment.Moment;
  source?: string;
  startAt?: moment.Moment;
  // task
  // user
  value?: number;
}

export class UserTask implements IUserTask {
  public id?: number | string;
  public description?: string;
  public finishAt?: moment.Moment;
  public source?: string;
  public startAt?: moment.Moment;
  // task
  // user
  public value?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (includes(['finishAt', 'startAt'], key)) {
        if (val) {
          this[key] = moment(val);
        } else {
          this[key] = undefined;
        }
      } else {
        this[key] = val;
      }
    });
  }

  get durationInSeconds(): number {
    if (this.finishAt) {
      return this.finishAt.diff(this.startAt, 'second');
    }
    return moment().diff(this.startAt, 'second');
  }

  get duration() {
    if (this.finishAt) {
      return covertSecondsToDuration(this.durationInSeconds);
    }
    return '00:00 мин';
  }
}
