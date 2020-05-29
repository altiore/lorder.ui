export enum TASK_TYPE {
  BUG = 'bug',
  FEATURE = 'feature',
  ENHANCE = 'enhance',
  DOCUMENTATION = 'documentation',
  ORGANIZE = 'organize',
}

export interface ITaskType {
  id: number;
  name: TASK_TYPE;
}
