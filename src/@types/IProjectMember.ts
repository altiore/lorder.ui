import { ACCESS_LEVEL } from '@store/projects';

export interface IProjectMember {
  accessLevel: ACCESS_LEVEL;
  avatar: string;
  id: string;
  email: string;
}
