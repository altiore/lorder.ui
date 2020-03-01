import moment from 'moment';

export interface IEvent<D = any> {
  data: D;
  finishAt?: moment.Moment | null;
  isActive: boolean;
  name: string;
  startAt: moment.Moment;
}
