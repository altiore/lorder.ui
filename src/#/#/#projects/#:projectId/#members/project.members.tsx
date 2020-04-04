import React, { useCallback, useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import get from 'lodash/get';

import { ICrudColumn } from '@components/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';
import { ACCESS_LEVEL } from '#/@store/projects';

export interface IProjectMembersProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteManyItems: any;
  fetchItems?: any;
  fetchRoles: () => void;
  openedAccessLevel: any;
  list: any[];
  rolesList: any[];
  updateMemberLevel: (level: ACCESS_LEVEL, memberId: number) => any;
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
  { title: 'Роли', path: 'member.id', multiple: true },
  { title: 'Уровень доступа', path: 'accessLevel', allowed: ACCESS_LEVEL },
];

export const ProjectMembersJsx: React.FC<IProjectMembersProps> = React.memo(
  ({
    createItem,
    deleteItem,
    deleteManyItems,
    fetchItems,
    fetchRoles,
    openedAccessLevel,
    list,
    rolesList,
    updateMemberLevel,
    userId,
    ...rest
  }) => {
    useEffect(() => {
      if (fetchItems) {
        fetchItems();
      }
    }, [fetchItems]);

    useEffect(() => {
      if (fetchRoles) {
        fetchRoles();
      }
    }, [fetchRoles]);

    const preparedList = useMemo(() => {
      return get(list, 'list');
    }, [list]);

    const handleEditItem = useCallback(
      (itemId, newValue) => {
        if (typeof newValue.accessLevel !== 'undefined') {
          updateMemberLevel(parseInt(newValue.accessLevel, 0), itemId);
        }
      },
      [updateMemberLevel]
    );

    const preparedColumns = useMemo(() => {
      COLUMNS[3].allowed = rolesList.reduce((res, cur) => {
        res[cur.id] = cur.name;
        return res;
      }, {});
      // только человек с максимальным уровнем доступа к проекту может редактировать accessLevel Других пользовтаелей
      COLUMNS[4].editable = openedAccessLevel >= ACCESS_LEVEL.VIOLET;
      // нельзя редактировать свой уровень доступа или уровень доступа человека, у которого максимальный уровень доступа
      COLUMNS[4].skip = item => item.accessLevel === ACCESS_LEVEL.VIOLET || item.member.id === userId;
      return COLUMNS;
    }, [openedAccessLevel, rolesList, userId]);

    return (
      <Page>
        <Crud
          formName={'CreateProjectMemberForm'}
          entityName="Участник"
          createTitle="Пригласить"
          createItem={createItem}
          deleteItem={deleteItem}
          deleteBulk={deleteManyItems}
          editItem={handleEditItem}
          getId={getUserId}
          columns={preparedColumns}
          rows={preparedList}
        />
      </Page>
    );
  }
);
