export enum TASK_TYPE {
  BUG = 'bug',
  BUG_BACK_END = 'bug.back-end',
  BUG_FRONT_END = 'bug.front-end',
  FEATURE = 'feature',
  FEATURE_BACK_END = 'feature.back-end',
  FEATURE_FRONT_END = 'feature.front-end',
  ENHANCE = 'enhance',
  DOCUMENTATION = 'documentation',
  ORGANIZE = 'organize',
}

export interface ITaskType {
  id: number;
  name: TASK_TYPE;
}
