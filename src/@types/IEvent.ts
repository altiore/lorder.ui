import * as moment from 'moment';

export interface IEvent {
  data: any;
  finishAt?: moment.Moment;
  isActive: boolean;
  name: string;
  startAt: moment.Moment;
}
