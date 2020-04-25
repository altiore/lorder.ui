import moment from 'moment';

export class Timer {
  projectId?: number | string = undefined;
  start?: moment.Moment;
  taskId?: number | string = undefined;
  time: number = 0;
  timer?: any = undefined;
  userWorkId?: number | string = undefined;
}
