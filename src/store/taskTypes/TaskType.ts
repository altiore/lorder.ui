import map from 'lodash-es/map';

export class TaskType {
  public readonly id?: number;
  public readonly title: string;
  public readonly isPublic: boolean;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
