import map from 'lodash/map';

import { convertSecondsToDuration } from '#/@store/@common/helpers';

import { IProjectPart, ITask, IUser, IUserTask } from '@types';

export class Task implements ITask {
  isArchived: boolean;
  isDetailsLoaded: boolean;
  id: number;
  title: string;
  description: string;
  performerId?: number;
  performer?: IUser;
  projectId: number;
  sequenceNumber: number;
  source?: string;
  status: number;
  statusTypeName: string;
  value: number;
  typeId?: number;
  userTasks: IUserTask[] = [];
  projectParts: IProjectPart[] = [];

  constructor(initial?: any) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }

  get durationInSeconds(): number {
    const performerUserTask = this.userTasks.find(el => el.userId === this.performerId);
    if (performerUserTask && performerUserTask.time) {
      return Math.round(performerUserTask.time / 1000);
    }

    return 0;
  }

  get duration(): string {
    return convertSecondsToDuration(this.durationInSeconds);
  }

  toLowerCase() {
    return this.title.toLowerCase();
  }
}
