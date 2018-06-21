import map from 'lodash-es/map'

export interface IProjectState {
  title: string;
  monthlyBudget?: number;
}

export class Project implements IProjectState {
  public readonly title: string;
  public readonly monthlyBudget?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
