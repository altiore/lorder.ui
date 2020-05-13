import { IDownloadList } from './IDownloadList';
import { IUser } from './IUser';
import { IUserTask } from './IUserTask';
import { IUserWork } from './IUserWork';

export interface ITask {
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
  userWorks?: IDownloadList<IUserWork>;
  userTasks?: IUserTask[];

  duration: string;
  durationInSeconds: number;
}
