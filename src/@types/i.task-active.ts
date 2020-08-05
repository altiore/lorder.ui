import { IDownloadList } from './i.download-list';
import { ITaskLog } from './i.task-log';

export interface ITaskActive {
  taskLogs: IDownloadList<ITaskLog>;
}
