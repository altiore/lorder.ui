import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from '@components/page';

import Crud from '#/@common/crud';
import { CREATE_ROLE_FORM } from '#/@store/roles';

export interface ITaskTypesProps extends RouteComponentProps {
  deleteTaskType: any;
  getAllTaskTypes: any;
  postTaskType: any;
  list: any[];
}

const COLUMNS = [
  { title: 'Id', path: 'id' },
  { title: 'Тип', path: 'name', name: 'name' },
];

export const TaskTypesJsx: React.FC<ITaskTypesProps> = ({ postTaskType, deleteTaskType, getAllTaskTypes, list }) => {
  useEffect(() => {
    getAllTaskTypes();
  }, [getAllTaskTypes]);

  return (
    <Page>
      <Crud
        formName={CREATE_ROLE_FORM}
        entityName="Тыпы задач"
        createItem={postTaskType}
        deleteItem={deleteTaskType}
        columns={COLUMNS}
        rows={list}
      />
    </Page>
  );
};
