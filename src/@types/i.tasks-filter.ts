export interface ITasksFilter {
  filter: string;
  projectParts: number[];
  search?: string;
  projectId: number;
  members: number[];
  openedStatuses: string[];
  selectedRole?: string;
}
