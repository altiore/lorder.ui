import { IProjectRole } from './i.project-role';
import { IUser } from './i.user';

export interface IMember {
  accessLevel: number;
  roles?: IProjectRole[];
  member: IUser;
  timeSum: number;
  valueSum: number;
  opinion?: string;
  projectId: number;
  memberId: number;

  // дополнительные поля на фронте
  memberRole: string;
}
