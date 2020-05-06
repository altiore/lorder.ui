import { IDownloadList } from './IDownloadList';
import { ITaskLog } from './ITaskLog';

export interface ITaskActive {
  taskLogs: IDownloadList<ITaskLog>;
}
