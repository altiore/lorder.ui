import map from 'lodash-es/map';

export class DownloadListItem {
  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
