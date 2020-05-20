import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ICrudColumn } from '@components/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';

export interface IWebHooksProps extends RouteComponentProps {
  getAllWebHooks: any;
  list: any[];
}

const COLUMNS: ICrudColumn[] = [
  { title: 'Id', path: 'id' },
  { title: 'Данные', path: 'data' },
  { title: 'Создан', path: 'createdAt' },
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
