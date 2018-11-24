import map from 'lodash-es/map';

import { covertSecondsToDurationWithLocal } from 'src/store/@common/helpers';

export class PublicProject {
  id: number;
  isLoading: boolean = false;
  isLoaded: boolean = false;
  title: string;
  monthlyBudget?: number;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }

  get fullProjectTimeHumanize() {
    return covertSecondsToDurationWithLocal(this.timeSum || 0);
  }
}
