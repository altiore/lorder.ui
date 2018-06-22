import map from 'lodash-es/map';

export class Project {
  public readonly id?: number;
  public readonly title: string;
  public readonly monthlyBudget?: number;
  public readonly owner?: any;
  public readonly phases?: any[];

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
