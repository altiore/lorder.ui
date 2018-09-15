import { requestActions } from 'src/store/@common/requestActions';

import { PROJECT_TASK_TYPE_FORM_NAME } from 'src/store/projects';

export interface IProjectTaskTypesData {
  projectId: number;
  taskTypes: number[];
}

export const putProjectTaskTypes = requestActions<IProjectTaskTypesData>(
  'PROJECT_TASK_TYPE/PUT_TASK_TYPES',
  ({ projectId, taskTypes = [] }: IProjectTaskTypesData) => ({
    form: PROJECT_TASK_TYPE_FORM_NAME,
    request: {
      data: taskTypes,
      url: `/projects/${projectId}/task-types`,
    },
  })
);
