import map from 'lodash/map';

import { convertSecondsToDuration } from '#/@store/@common/helpers';

import { ITask, IUser } from '@types';

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
  userTasks?: any[] = [];

  constructor(initial?: any) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }

  get durationInSeconds(): number {
    // TODO: fix correct duration
    return 0;
  }

  get duration(): string {
    return convertSecondsToDuration(this.durationInSeconds);
  }

  toLowerCase() {
    return this.title.toLowerCase();
  }
}
