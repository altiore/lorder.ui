import { ROLE } from './role';

export interface IUser {
  avatar?: {
    url?: string;
  };
  readonly id?: number;
  readonly email: string;
  tel: string;
  readonly status: number;
  paymentMethod: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  role: ROLE;
  projectsCount: number;
  displayName?: string;
  defaultProjectId: number;

  // calculated fields
  readonly userName: string;
  readonly shortName: string;
  readonly avatarUrl?: string;
}
