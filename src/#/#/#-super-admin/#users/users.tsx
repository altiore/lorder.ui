import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from '@components/page';

import Crud from '#/@common/crud';

export interface IUsersProps extends RouteComponentProps {
  deleteUser: any;
  fetchUsers: any;
  patchUser: any;
  userList: any[];
  routes: any;
}

const COLUMNS = [
  { title: 'Email', path: 'email' },
  { title: 'Создан', path: 'createdAt' },
  { title: 'Телефон', path: 'tel' },
  { title: 'Статус', path: 'status', isNumber: true },
  { title: 'Роль', path: 'role' },
  { title: 'Кол-во проектов', path: 'projectsCount', isNumber: true },
];

export const UsersJsx: React.FC<IUsersProps> = ({ deleteUser, fetchUsers, patchUser, routes, userList }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Page>
      <Crud
        formName={'CREATE_USER_FORM'}
        entityName="Пользователи"
        deleteItem={deleteUser}
        columns={COLUMNS}
        rows={userList}
      />
    </Page>
  );
};
