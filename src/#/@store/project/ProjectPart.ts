import { IProjectPart } from '@types';

export class ProjectPart implements IProjectPart {
  id: number = 0;
  parentId: number = 0;
  projectId: number = 0;
  title: string = '';
}
