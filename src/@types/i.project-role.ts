import { IUserRole, ROLE_FLOW } from './i.user-role';

export interface IProjectRole {
  name?: string;
  id: string;
  isPublic: boolean;

  projectId: number;
  role: IUserRole;
  roleId: ROLE_FLOW;
}
