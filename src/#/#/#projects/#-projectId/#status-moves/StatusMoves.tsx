import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import invert from 'lodash/invert';

import { ICrudColumn } from '@components/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';
import { CREATE_TASK_STATUS_MOVE_FORM } from '#/@store/project-status-moves';

import { TASK_STATUS_MOVE_TYPE } from '@types';

export interface IStatusMovesProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteBulk: any;
  fetchItems: any;
  fetchProjectRoles: any;
  list: any[];
  projectId: number;
  projectRoles: any[];
  taskStatusesList: any[];
}

const COLUMNS: ICrudColumn[] = [
  { title: 'Id', path: 'id' },
  { title: 'Роль', path: 'projectRoleId', name: 'projectRoleId', isNumber: true },
  { title: 'Тип', path: 'type', allowed: invert(TASK_STATUS_MOVE_TYPE), name: 'type' },
  { title: 'Из Статуса', path: 'fromId', name: 'fromId', isNumber: true },
  { title: 'В Статус', path: 'toId', name: 'toId', isNumber: true },
];

export const StatusMovesJsx: React.FC<IStatusMovesProps> = ({
  createItem,
  deleteItem,
  fetchItems,
  list,
  projectRoles,
  taskStatusesList,
}) => {
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const preparedColumns = useMemo(() => {
    COLUMNS[1].allowed = projectRoles.reduce((res, cur) => {
      res[cur.id] = cur.role.name;
      return res;
    }, {});
    COLUMNS[3].allowed = COLUMNS[4].allowed = taskStatusesList.reduce((res, cur) => {
      res[cur.id] = cur.name;
      return res;
    }, {});
    return COLUMNS;
  }, [projectRoles, taskStatusesList]);

  return (
    <Page>
      <Crud
        formName={CREATE_TASK_STATUS_MOVE_FORM}
        entityName="Разрешенные перемещения"
        createItem={createItem}
        deleteItem={deleteItem}
        columns={preparedColumns}
        rows={list}
      />
    </Page>
  );
};
