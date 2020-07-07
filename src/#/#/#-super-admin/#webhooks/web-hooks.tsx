import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IColumnComponent, ICrudColumn } from '@components/Crud/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';

export interface IWebHooksProps extends RouteComponentProps {
  getAllWebHooks: any;
  list: any[];
}

const DataComponent: React.FC<IColumnComponent> = ({ value }) => {
  return <div>{value.action}</div>;
};

const DateComponent: React.FC<IColumnComponent> = ({ value }) => {
  return <div>{value}</div>;
};

const COLUMNS: ICrudColumn[] = [
  { title: 'Id', path: 'id' },
  { title: 'Данные', path: 'data', component: DataComponent },
  { title: 'Создан', path: 'createdAt', component: DateComponent },
];

export const WebHooksJsx: React.FC<IWebHooksProps> = ({ getAllWebHooks, list }) => {
  useEffect(() => {
    getAllWebHooks();
  }, [getAllWebHooks]);

  return (
    <Page>
      <Crud entityName="Web Hooks" columns={COLUMNS} rows={list} />
    </Page>
  );
};
