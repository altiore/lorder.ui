import map from 'lodash/map';

import { convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';

import { Project } from '../projects';

import { IProject, IPublicProject } from '@types';

export class PublicProject implements IPublicProject {
  uuid: string;
  title: string;
  projectId: number;
  monthlyBudget?: number;
  /** время в секундах, потраченное всеми пользователями на этот проект */
  timeSum?: number;
  /** ценность всех задач в этом проекте */
  valueSum?: number;
  project: IProject;
  statistic?: object;

  isLoading: boolean = false;
  isLoaded: boolean = false;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      if (key === 'project') {
        this[key] = new Project(val);
        return;
      }
      this[key] = val;
    });
  }

  get fullProjectTimeHumanize() {
    return convertSecondsToDurationWithLocal(this.timeSum || 0, 8);
  }
}
