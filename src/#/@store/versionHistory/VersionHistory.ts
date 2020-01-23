import map from 'lodash/map';

export class VersionHistory {
  readonly version?: string = process.env.REACT_APP_VERSION;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
