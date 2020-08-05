import { ACCESS_LEVEL } from '@types';

export interface IProjectMember {
  accessLevel: ACCESS_LEVEL;
  avatar: string;
  id: string;
  email: string;
}
