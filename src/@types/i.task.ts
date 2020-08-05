import { IDownloadList } from './i.download-list';
import { IProjectPart } from './i.project-part';
import { IUser } from './i.user';
import { IUserTask } from './i.user-task';
import { IUserWork } from './i.user-work';

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
  inProgress: boolean;

  duration: string;
  durationInSeconds: number;
}
