import map from 'lodash/map';

export interface IFeedback {
  id: number;
  name: string;
  email: string;
  feedback: string;
  userId: number;
}

export class Feedback implements IFeedback {
  readonly id: number;
  name: string;
  email: string;
  feedback: string;
  userId: number;

  constructor(initial?: object) {
    map(initial, (val: any, key: string) => {
      this[key] = val;
    });
  }
}
