import map from 'lodash-es/map';

import { ITask } from 'src/@types';
import { DownloadList } from 'src/store/@common/entities';
import { convertSecondsToDuration } from 'src/store/@common/helpers';
import { UserWork } from 'src/store/tasks';

export class Task implements ITask {
  isDetailsLoaded: boolean;
  id: number | string;
  title: string;
  description: string;
  performerId?: number;
  projectId: number;
  source?: string;
  status: number;
  value: number;
  userWorks: DownloadList<UserWork> = new DownloadList(UserWork);

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
