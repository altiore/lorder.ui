import map from 'lodash/map';

export class DownloadListItem {
  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
