export interface ITasksFilter {
  filter: string;
  projectPart?: number | string;
  search?: string;
  members: number[];
  openedStatuses: number[];
}
