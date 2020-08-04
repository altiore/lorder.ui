import { IUser } from './IUser';

export enum COMPLEXITY {
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR',
  ARCHITECT = 'ARCHITECT',
  DISCUSSION = 'DISCUSSION',
  COMMUNITY = 'COMMUNITY',
}

export enum URGENCY {
  LOW = 'LOW',
  REGULAR = 'REGULAR',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  ULTRA = 'ULTRA',
}

export interface IUserTask {
  userId: number;
  taskId: number;
  benefitPart: number;
  time: number;
  user: IUser;

  complexity?: COMPLEXITY;
  urgency?: URGENCY;
  userValue?: number;
  userValueFinal?: number;
}
