import React, { useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { Page } from '@components/Page';
import Crud from '#/@common/Crud';
import { CREATE_TASK_STATUS_FORM } from '#/@store/task-statuses';

export interface ITaskStatusesProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteBulk: any;
  fetchItems: any;
  list: any[];
}

const COLUMNS = [{ title: 'Id', path: 'id' }, { title: 'Name', path: 'name' }];

export const TaskStatuses: React.FC<ITaskStatusesProps> = ({
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
        formName={CREATE_TASK_STATUS_FORM}
        entityName="Статусы задач"
        createItem={createItem}
        deleteItem={deleteItem}
        deleteBulk={deleteBulk}
        columns={COLUMNS}
        rows={list}
      />
    </Page>
  );
};
