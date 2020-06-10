import { IUser } from './IUser';

export interface IMember {
  accessLevel: number;
  roles: string[];
  member: IUser;
  timeSum: number;
  valueSum: number;
}
