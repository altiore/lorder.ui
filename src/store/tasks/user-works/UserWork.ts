import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import * as moment from 'moment';

import { IUserWork } from 'src/@types';
import { covertSecondsToDuration } from 'src/store/@common/helpers';

export class UserWork implements IUserWork {
  id?: number | string;
  description?: string;
  finishAt?: moment.Moment;
  projectId: number;
  source?: string;
  startAt?: moment.Moment;
  taskId?: number;
  taskTypeId?: number;
  value?: number;

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
    return covertSecondsToDuration(this.durationInSeconds);
  }
}
