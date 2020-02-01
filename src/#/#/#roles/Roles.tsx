import React, { useEffect } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import { Page } from '@components/Page';
import Crud from '#/@common/Crud';
import { LayoutLeftDrawer } from '#/@common/LayoutLeftDrawer';

export interface IRolesProps extends RouteComponentProps {
  createRole: any;
  deleteRole: any;
  fetchRoles: any;
  rolesList: any[];
}

export const Roles: React.FC<IRolesProps> = ({ createRole, deleteRole, fetchRoles, rolesList }) => {
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return (
    <LayoutLeftDrawer>
      <Page>
        <Crud
          entityName="UserRoles"
          createItem={createRole}
          deleteItem={deleteRole}
          items={rolesList}
          rows={[{ title: 'Id', path: 'id', isNumber: true }, { title: 'Name', path: 'name' }]}
        />
      </Page>
    </LayoutLeftDrawer>
  );
};
