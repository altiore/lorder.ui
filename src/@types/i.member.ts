import { IUser } from './i.user';

export interface IMember {
  accessLevel: number;
  roles: string[];
  member: IUser;
  timeSum: number;
  valueSum: number;
}
