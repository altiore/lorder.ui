import map from 'lodash/map';

export class TaskType {
  readonly id: number;
  readonly title: string;
  readonly isPublic: boolean;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
