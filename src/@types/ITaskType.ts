export enum TASK_TYPE {
  BUG = 'bug',
  BUG_BACK_END = 'bug.back-end',
  FEATURE = 'feature',
  FEATURE_BACK_END = 'feature.back-end',
  ENHANCE = 'enhance',
  DOCUMENTATION = 'documentation',
  ORGANIZE = 'organize',
}

export interface ITaskType {
  id: number;
  name: TASK_TYPE;
}
