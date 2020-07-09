import { IDownloadList } from './IDownloadList';
import { IProjectPart } from './IProjectPart';
import { IUser } from './IUser';
import { IUserTask } from './IUserTask';
import { IUserWork } from './IUserWork';

export interface ITask {
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
  userWorks?: IDownloadList<IUserWork>;
  userTasks?: IUserTask[];
  projectParts: IProjectPart[];

  duration: string;
  durationInSeconds: number;
}
