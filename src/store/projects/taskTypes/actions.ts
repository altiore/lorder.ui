import { requestActions } from 'src/store/@common/requestActions';

export interface IProjectTaskTypesData {
  projectId: number;
  taskTypes: number[];
}

export const putProjectTaskTypes = requestActions<IProjectTaskTypesData>(
  'PROJECT_TASK_TYPE/PUT_TASK_TYPES',
  ({ projectId, taskTypes = [] }: IProjectTaskTypesData) => ({
    form: 'TaskTypesForm',
    request: {
      data: taskTypes,
      url: `/projects/${projectId}/task-types`,
    },
  }));
