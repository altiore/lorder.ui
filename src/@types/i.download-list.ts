import { AxiosResponse } from 'axios';

export interface IDownloadList<T> {
  Entity: any;

  isLoaded: boolean;
  isLoading: boolean;

  expiredIn: number;
  list: T[];
  slice: any;
  length: number;
  map: any;
  reduce: any;
  find: any;

  addItem: (payload: Partial<T>) => IDownloadList<T>;
  removeItem: (index: number) => IDownloadList<T>;
  updateItem: (index: number, payload: Partial<T>) => IDownloadList<T>;

  startLoading: () => IDownloadList<T>;
  stopLoading: () => IDownloadList<T>;
  finishLoading(payload?: AxiosResponse<T[]>): IDownloadList<T>;
  filter(a: (el: T) => boolean): IDownloadList<T>;
}
