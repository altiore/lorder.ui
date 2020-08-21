import { IProjectRole } from './i.project-role';
import { IUser } from './i.user';

export interface IMember {
  accessLevel: number;
  roles?: IProjectRole[];
  member: IUser;
  timeSum: number;
  valueSum: number;
  opinion?: string;

  // дополнительные поля на фронте
  memberRole: string;
}
