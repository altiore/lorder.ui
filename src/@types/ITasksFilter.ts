export interface ITasksFilter {
  filter: string;
  projectPart?: number | string;
  search?: string;
  projectId: number;
  members: number[];
  openedStatuses: string[];
}
