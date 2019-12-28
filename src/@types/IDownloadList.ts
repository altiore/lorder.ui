import { AxiosResponse } from 'axios';

export interface IDownloadList<T> {
  expiredIn: number;
  list: T[];
  slice: any;
  length: number;
  map: any;
  reduce: any;

  startLoading: () => IDownloadList<T>;
  stopLoading: () => IDownloadList<T>;
  finishLoading(payload?: AxiosResponse<T[]>): IDownloadList<T>;
}
