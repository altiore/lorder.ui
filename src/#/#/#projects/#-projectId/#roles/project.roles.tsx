import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { CheckboxCell } from '@components/crud/@cells/checkbox/checkbox.cell';
import { ICrudColumn } from '@components/crud/crud';
import Page from '@components/page';

import Crud from '#/@common/crud';

import { ACCESS_LEVEL } from '@types';

export interface IProjectMembersProps extends RouteComponentProps {
  createProjectRole: (data: { roleId: string; allowedMoveIds: number[]; name?: string }) => any;
  deleteProjectRole: any;
  editProjectRole: any;
  fetchProjectRoles?: any;
  fetchRoles: () => void;
  openedAccessLevel?: ACCESS_LEVEL;
  projectRoles: any[];
  rolesList: any[];
}

const COLUMNS: ICrudColumn[] = [
  { title: 'ID', path: 'id' },
  { title: 'Название', path: 'role.id', name: 'roleId' },
  { title: 'Публичная', path: 'isPublic', name: 'isPublic', isBoolean: true, component: CheckboxCell },
];

export const ProjectRolesJsx: React.FC<IProjectMembersProps> = React.memo(
  ({
    createProjectRole,
    deleteProjectRole,
    editProjectRole,
    fetchProjectRoles,
    fetchRoles,
    openedAccessLevel,
    projectRoles,
    rolesList,
  }) => {
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
      COLUMNS[2].editable = Boolean(openedAccessLevel && openedAccessLevel >= ACCESS_LEVEL.GREEN);
      return COLUMNS;
    }, [openedAccessLevel, rolesList]);

    return (
      <Page>
        <Crud
          formName={'CreateProjectRoleForm'}
          editItem={editProjectRole}
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
