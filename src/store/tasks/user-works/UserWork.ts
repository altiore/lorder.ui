import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import * as moment from 'moment';

import { ITask, IUserWork } from '@types';
import { convertSecondsToDuration } from 'store/@common/helpers';
import { Task } from '../Task';

export class UserWork implements IUserWork {
  id?: number | string;
  description?: string;
  finishAt?: moment.Moment;
  projectId: number;
  source?: string;
  startAt: moment.Moment;
  task?: ITask;
  taskId: number;
  taskTypeId?: number;
  value?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'task') {
        return (this[key] = new Task(val));
      }
      if (includes(['finishAt', 'startAt'], key)) {
        if (val) {
          return (this[key] = moment(val));
        } else {
          return (this[key] = undefined);
        }
      }

      return (this[key] = val);
    });
  }

  get durationInSeconds(): number {
    if (this.finishAt) {
      return this.finishAt.diff(this.startAt, 'second');
    }
    return moment().diff(this.startAt, 'second');
  }

  get duration() {
    return convertSecondsToDuration(this.durationInSeconds);
  }
}
