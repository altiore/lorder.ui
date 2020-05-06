import { IUser } from './IUser';

export interface IUserTask {
  userId: number;
  taskId: number;
  benefitPart: number;
  time: number;
  user: IUser;
}
