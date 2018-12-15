import get from 'lodash-es/get';
import map from 'lodash-es/map';

import { covertSecondsToDurationWithLocal, millisecondsToHours } from 'src/store/@common/helpers';

export class Statistic {
  members: Array<{ accessLevel: number; avatar: string; id: number; email: string }>;
  data: { [key in any]: { time: number; value: number } };
}

export class PublicProject {
  uuid: string;
  isLoading: boolean = false;
  isLoaded: boolean = false;
  title: string;
  projectId: number;
  monthlyBudget?: number;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;
  statistic?: Statistic;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }

  get fullProjectTimeHumanize() {
    return covertSecondsToDurationWithLocal(this.timeSum || 0);
  }

  get chartData() {
    if (!this.statistic) {
      return [];
    }
    const { members, data } = this.statistic;
    return Object.keys(data).map(el => ({
      name: get(members.find(m => m.id.toString() === el), 'email'),
      y: millisecondsToHours(data[el].time),
    }));
  }

  get chartValueData() {
    if (!this.statistic) {
      return [];
    }
    const { members, data } = this.statistic;
    return Object.keys(data).map(el => ({
      name: get(members.find(m => m.id.toString() === el), 'email'),
      y: data[el].value || 1,
    }));
  }
}
