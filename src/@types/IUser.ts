import { ROLE } from './ROLE';

export interface IUser {
  avatar?: string;
  readonly id?: number;
  readonly email: string;
  tel: string;
  readonly status: number;
  paymentMethod: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  role: ROLE;
  projectsCount: number;
}
