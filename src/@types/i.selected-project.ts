import { IProjectPart } from './i.project-part';

export interface ISelectedProject {
  roles: any[];
  members: any[];
  selected?: number;

  parts: IProjectPart[];
}
