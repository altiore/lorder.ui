import map from 'lodash-es/map';

import { DownloadList } from 'src/store/@common/entities';
import { covertSecondsToDuration } from 'src/store/@common/helpers';
import { UserWork } from 'src/store/tasks';

export interface ITask {
  id: number | string;
  title: string;
  description: string;
  projectId: number;
  source?: string;
  value: number;
  userWorks: DownloadList<UserWork>;
}

export class Task implements ITask {
  id: number | string;
  title: string;
  description: string;
  projectId: number;
  source?: string;
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
    return covertSecondsToDuration(this.durationInSeconds);
  }

  toLowerCase() {
    return this.title.toLowerCase();
  }
}
