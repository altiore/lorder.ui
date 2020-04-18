import map from 'lodash/map';

import { DownloadList } from '#/@store/@common/entities';
import { convertSecondsToDuration } from '#/@store/@common/helpers';
import { UserWork } from '#/@store/tasks/index';

import { IDownloadList, ITask, IUser, IUserWork } from '@types';

export class Task implements ITask {
  isDetailsLoaded: boolean;
  id: number | string;
  title: string;
  description: string;
  performerId?: number;
  performer?: IUser;
  projectId: number;
  sequenceNumber: number;
  source?: string;
  status: number;
  value: number;
  typeId?: number;
  userWorks: IDownloadList<IUserWork> = new DownloadList(UserWork);
  userTasks?: any[] = [];

  constructor(initial?: any) {
    map(initial, (val: any, key: string) => {
      if (key === 'userWorks') {
        this[key] = new DownloadList(UserWork, val, Array.isArray(val));
        return;
      }
      this[key] = val;
    });
  }

  get durationInSeconds(): number {
    return this.userWorks.list.reduce((res, current) => res + current.durationInSeconds, 0);
  }

  get duration(): string {
    return convertSecondsToDuration(this.durationInSeconds);
  }

  toLowerCase() {
    return this.title.toLowerCase();
  }
}
