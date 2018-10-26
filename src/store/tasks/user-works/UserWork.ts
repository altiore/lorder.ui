import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import * as moment from 'moment';

import { covertSecondsToDuration } from 'src/store/@common/helpers';
// import { Task } from 'src/store/tasks';

export interface IUserWork {
  id?: number | string;
  description?: string;
  finishAt?: moment.Moment;
  projectId: number;
  source?: string;
  startAt?: moment.Moment;
  taskId?: number;
  taskTypeId?: number;
  // task?: Task;
  // user
  value?: number;
}

export class UserWork implements IUserWork {
  public id?: number | string;
  public description?: string;
  public finishAt?: moment.Moment;
  public projectId: number;
  public source?: string;
  public startAt?: moment.Moment;
  public taskId?: number;
  public taskTypeId?: number;
  // public task?: Task;
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
    return covertSecondsToDuration(this.durationInSeconds);
  }
}
