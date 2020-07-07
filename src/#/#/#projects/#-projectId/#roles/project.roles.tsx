import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ICrudColumn } from '@components/Crud/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';

export interface IProjectMembersProps extends RouteComponentProps {
  createProjectRole: (data: { roleId: string; allowedMoveIds: number[]; name?: string }) => any;
  deleteProjectRole: any;
  fetchProjectRoles?: any;
  fetchRoles: () => void;
  projectRoles: any[];
  rolesList: any[];
}

const COLUMNS: ICrudColumn[] = [
  { title: 'ID', path: 'id' },
  { title: 'Название', path: 'role.id', name: 'roleId' },
  { title: 'Разрешия', path: 'allowedMoveIds' },
];

export const ProjectRolesJsx: React.FC<IProjectMembersProps> = React.memo(
  ({ createProjectRole, deleteProjectRole, fetchProjectRoles, fetchRoles, projectRoles, rolesList }) => {
    useEffect(() => {
      if (fetchProjectRoles) {
        fetchProjectRoles();
      }
    }, [fetchProjectRoles]);

    useEffect(() => {
      if (fetchRoles) {
        fetchRoles();
      }
    }, [fetchRoles]);

    const preparedColumns = useMemo(() => {
      COLUMNS[1].allowed = rolesList.reduce((res, cur) => {
        res[cur.id] = cur.name;
        return res;
      }, {});
      return COLUMNS;
    }, [rolesList]);

    return (
      <Page>
        <Crud
          formName={'CreateProjectRoleForm'}
          entityName="Роли Проекта"
          createTitle="Добавить"
          createItem={createProjectRole}
          deleteItem={deleteProjectRole}
          columns={preparedColumns}
          rows={projectRoles}
        />
      </Page>
    );
  }
);
