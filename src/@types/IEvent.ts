import * as moment from 'moment';

export interface IEvent {
  name: string;
  startAt: moment.Moment;
  finishAt?: moment.Moment;
  data: any;
}
