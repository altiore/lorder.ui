export interface IDownloadList<T> {
  expiredIn: number;
  list: T[];
  slice: any;
  length: number;
  map: any;
  reduce: any;
}
