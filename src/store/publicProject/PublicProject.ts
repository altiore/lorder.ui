import map from 'lodash-es/map';

import { covertSecondsToDurationWithLocal } from 'src/store/@common/helpers';

export class PublicProject {
  public id: number;
  public isLoading: boolean = false;
  public isLoaded: boolean = false;
  public title: string;
  public monthlyBudget?: number;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  public timeSum?: number;
  /** ценность всех задач в этом проекте */
  public valueSum?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }

  get fullProjectTimeHumanize() {
    return covertSecondsToDurationWithLocal(this.timeSum || 0);
  }
}
