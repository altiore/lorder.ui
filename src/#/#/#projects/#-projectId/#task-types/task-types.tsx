import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ICrudColumn } from '@components/Crud/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';

export interface IProjectTaskTypesProps extends RouteComponentProps {
  addTaskTypeToProject: any;
  getAllTaskTypes?: any;
  getAllProjectTaskTypes?: any;
  projectId: number;
  projectTaskTypes: any[];
  removeTaskTypeFromProject: any;
  taskTypeList: any[];
}

const COLUMNS: ICrudColumn[] = [
  { title: '№', path: 'order' },
  { title: 'Название', path: 'taskTypeId', name: 'taskTypeId' },
];

const getId = el => (el ? el.taskTypeId : 0);

export const ProjectTaskTypesJsx: React.FC<IProjectTaskTypesProps> = React.memo(
  ({
    addTaskTypeToProject,
    removeTaskTypeFromProject,
    getAllProjectTaskTypes,
    getAllTaskTypes,
    projectId,
    projectTaskTypes,
    taskTypeList,
  }) => {
    useEffect(() => {
      if (getAllTaskTypes) {
        getAllTaskTypes();
      }
    }, [getAllTaskTypes]);

    useEffect(() => {
      if (getAllProjectTaskTypes) {
        getAllProjectTaskTypes(projectId);
      }
    }, [getAllProjectTaskTypes, projectId]);

    const deleteTaskType = useCallback(
      taskTypeId => {
        if (typeof taskTypeId === 'number') {
          removeTaskTypeFromProject({ projectId, taskTypeId });
        }
      },
      [removeTaskTypeFromProject, projectId]
    );

    const preparedColumns = useMemo(() => {
      COLUMNS[1].allowed = taskTypeList.reduce((res, cur) => {
        res[cur.id] = cur.name;
        return res;
      }, {});
      return COLUMNS;
    }, [taskTypeList]);

    const createTaskTypes = useCallback(
      ({ taskTypeId: taskTypeIdStr }) => {
        const taskTypeId = parseInt(taskTypeIdStr, 0);
        if (typeof taskTypeId === 'number') {
          addTaskTypeToProject({ projectId, taskTypeId });
        }
      },
      [addTaskTypeToProject, projectId]
    );

    return (
      <Page>
        <Crud
          formName={'CreateTaskTypeForm'}
          entityName="Типы задач"
          createTitle="Добавить"
          createItem={createTaskTypes}
          deleteItem={deleteTaskType}
          columns={preparedColumns}
          rows={projectTaskTypes || []}
          getId={getId}
        />
      </Page>
    );
  }
);
