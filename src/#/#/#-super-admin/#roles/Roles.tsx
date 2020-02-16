import React, { useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { Page } from '@components/Page';
import Crud from '#/@common/Crud';
import { CREATE_ROLE_FORM } from '#/@store/roles';

export interface IRolesProps extends RouteComponentProps {
  createRole: any;
  deleteRole: any;
  deleteManyRoles: any;
  fetchRoles: any;
  rolesList: any[];
}

export const Roles: React.FC<IRolesProps> = ({ createRole, deleteRole, deleteManyRoles, fetchRoles, rolesList }) => {
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <Page>
      <Crud
        formName={CREATE_ROLE_FORM}
        entityName="Роль"
        createItem={createRole}
        deleteItem={deleteRole}
        deleteBulk={deleteManyRoles}
        columns={[{ title: 'Id', path: 'id' }, { title: 'Name', path: 'name' }]}
        rows={rolesList}
      />
    </Page>
  );
};
