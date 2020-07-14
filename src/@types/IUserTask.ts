import { IUser } from './IUser';

export enum COMPLEXITY {
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR',
  ARCHITECT = 'ARCHITECT',
  DISCUSSION = 'DISCUSSION',
  COMMUNITY = 'COMMUNITY',
}

export interface IUserTask {
  userId: number;
  taskId: number;
  benefitPart: number;
  time: number;
  user: IUser;

  complexity?: COMPLEXITY;
}
