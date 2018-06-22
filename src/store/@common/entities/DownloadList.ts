import map from 'lodash-es/map';

export class DownloadList<T = any> {
  public readonly isLoaded: boolean = false;
  public readonly isLoading: boolean = false;
  public readonly list: T[] = [];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}