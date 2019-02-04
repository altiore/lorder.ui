import { IDownloadList } from './IDownloadList';
import { IUserWork } from './IUserWork';

export interface ITask {
  isDetailsLoaded: boolean;
  id: number | string;
  title: string;
  description: string;
  performerId?: number;
  projectId: number;
  source?: string;
  status: number;
  value: number;
  typeId?: number;
  userWorks: IDownloadList<IUserWork>;
}
