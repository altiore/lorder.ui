import React, { useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { Page } from '@components/Page';
import Crud from '#/@common/Crud';
import { CREATE_TASK_STATUS_MOVE_FORM } from '#/@store/task-status-moves';

export interface ITaskStatusMovesProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteBulk: any;
  fetchItems: any;
  list: any[];
}

const COLUMNS = [
  { title: 'Id', path: 'id' },
  { title: 'Имя', path: 'name' },
  { title: 'Из', path: 'fromId', isNumber: true },
  { title: 'В', path: 'toId', isNumber: true },
];

export const TaskStatusMovesJsx: React.FC<ITaskStatusMovesProps> = ({
  createItem,
  deleteItem,
  deleteBulk,
  fetchItems,
  list,
}) => {
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <Page>
      <Crud
        formName={CREATE_TASK_STATUS_MOVE_FORM}
        entityName="Разрешенные перемещения"
        createItem={createItem}
        deleteItem={deleteItem}
        deleteBulk={deleteBulk}
        columns={COLUMNS}
        rows={list}
      />
    </Page>
  );
};
