import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import get from 'lodash/get';

import { ICrudColumn } from '@components/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';

import { ACCESS_LEVEL } from '@types';

export interface IProjectMembersProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteManyItems: any;
  fetchItems?: any;
  openedAccessLevel: any;
  projectRoles: any[];
  list: any[];
  updateMemberLevel: (id, value) => any;
  userId: number;
}

const getUserId = el => get(el, ['member', 'id'], get(el, ['member', 'email']));

const STATUS = {
  1: 'Нет',
  10: 'Да',
};

const COLUMNS: ICrudColumn[] = [
  { title: 'Имя', path: 'member.displayName' },
  { title: 'E-mail', path: 'member.email', name: 'email' },
  { title: 'Активен', path: 'member.status', allowed: STATUS },
  { title: 'Роли', path: 'roles', multiple: true },
  { title: 'Уровень доступа', path: 'accessLevel', allowed: ACCESS_LEVEL },
];

export const ProjectMembersJsx: React.FC<IProjectMembersProps> = React.memo(
  ({
    createItem,
    deleteItem,
    deleteManyItems,
    fetchItems,
    openedAccessLevel,
    projectRoles,
    list,
    updateMemberLevel,
    userId,
  }) => {
    useEffect(() => {
      if (fetchItems) {
        fetchItems();
      }
    }, [fetchItems]);

    const preparedList = useMemo(() => {
      return get(list, 'list', []).map(el => ({
        ...el,
        roles: el.roles.map(r => r.role.id),
      }));
    }, [list]);

    const preparedColumns = useMemo(() => {
      COLUMNS[3].editable = openedAccessLevel >= ACCESS_LEVEL.VIOLET;
      COLUMNS[3].allowed = projectRoles.reduce((res, cur) => {
        res[cur.name || cur.role.name] = cur.role.id;
        return res;
      }, {});
      // только человек с максимальным уровнем доступа к проекту может редактировать accessLevel Других пользовтаелей
      COLUMNS[4].editable = openedAccessLevel >= ACCESS_LEVEL.VIOLET;
      // нельзя редактировать свой уровень доступа или уровень доступа человека, у которого максимальный уровень доступа
      COLUMNS[4].skip = item => item.accessLevel === ACCESS_LEVEL.VIOLET || item.member.id === userId;
      return COLUMNS;
    }, [openedAccessLevel, projectRoles, userId]);

    return (
      <Page>
        <Crud
          formName={'CreateProjectMemberForm'}
          entityName="Участник"
          createTitle="Пригласить"
          createItem={createItem}
          deleteItem={deleteItem}
          deleteBulk={deleteManyItems}
          editItem={updateMemberLevel}
          getId={getUserId}
          columns={preparedColumns}
          rows={preparedList}
        />
      </Page>
    );
  }
);
