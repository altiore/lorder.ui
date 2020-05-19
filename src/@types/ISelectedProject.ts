import { IProjectPart } from './IProjectPart';

export interface ISelectedProject {
  roles: any[];
  members: any[];
  selected?: number;

  parts: IProjectPart[];
}
