import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from '@components/Page';

import Crud from '#/@common/Crud';
import { CREATE_TASK_STATUS_FORM } from '#/@store/task-statuses';

import { ICrudColumn } from '../../../../@components/Crud';

export interface ITaskStatusesProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteBulk: any;
  fetchItems: any;
  list: any[];
}

const COLUMNS: ICrudColumn[] = [
  { title: 'Id', path: 'id', isNumber: true },
  { title: 'Name', path: 'name', name: 'name' },
  { title: 'From', path: 'statusFrom', isNumber: true, name: 'statusFrom' },
  { title: 'To', path: 'statusTo', isNumber: true, name: 'statusTo' },
];

const getId = i => i.name;

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

  const handleDeleteItem = useCallback(
    item => {
      if (typeof item.id === 'number') {
        deleteItem(item.id);
      } else {
        console.error('Item.id MUST be number!');
      }
    },
    [deleteItem]
  );

  return (
    <Page>
      <Crud
        formName={CREATE_TASK_STATUS_FORM}
        entityName="Статусы задач"
        createItem={createItem}
        deleteItem={handleDeleteItem}
        deleteBulk={deleteBulk}
        columns={COLUMNS}
        rows={list}
        getId={getId}
        useId={false}
      />
    </Page>
  );
};
