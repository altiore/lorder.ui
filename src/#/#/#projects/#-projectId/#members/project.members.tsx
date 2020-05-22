import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import get from 'lodash/get';

import { ICrudColumn } from '@components/Crud';
import SelectCell from '@components/Crud/@cells/select';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';
import { LinkButton } from '#/@common/LinkButton';
import { convertSecondsToDurationWithLocal } from '#/@store/@common/helpers';

import ColoredSelect from './colored.select';

import { ACCESS_LEVEL } from '@types';

export interface IProjectMembersProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteManyItems: any;
  fetchItems?: any;
  openedAccessLevel: any;
  projectId: number | string;
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

const TimeComponent: React.FC<any> = ({ value }): JSX.Element => {
  return <span>{convertSecondsToDurationWithLocal(value / 1000)}</span>;
};

const COLUMNS: ICrudColumn[] = [
  { title: 'Имя', path: 'member.displayName' },
  { title: 'E-mail', path: 'member.email', name: 'email' },
  { title: 'Активен', path: 'member.status', component: SelectCell, allowed: STATUS },
  { title: 'Время', path: 'timeSum', component: TimeComponent },
  { title: 'Вклад', path: 'valueSum' },
  { title: 'Роли', path: 'roles', multiple: true },
  { title: 'Уровень доступа', path: 'accessLevel', component: ColoredSelect, allowed: ACCESS_LEVEL },
];

export const ProjectMembersJsx: React.FC<IProjectMembersProps> = React.memo(
  ({
    createItem,
    deleteItem,
    deleteManyItems,
    fetchItems,
    openedAccessLevel,
    projectId,
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
      return (list || []).map(el => ({
        ...el,
        roles: el.roles ? el.roles.map(r => r.role.id) : [],
      }));
    }, [list]);

    const preparedColumns = useMemo(() => {
      COLUMNS[5].editable = openedAccessLevel >= ACCESS_LEVEL.VIOLET;
      COLUMNS[5].allowed = projectRoles.reduce((res, cur) => {
        res[cur.name || cur.role.name] = cur.role.id;
        return res;
      }, {});
      COLUMNS[5].emptyElement =
        openedAccessLevel >= ACCESS_LEVEL.INDIGO ? (
          <LinkButton to={`/projects/${projectId}/roles`}>Добавить роли в проект</LinkButton>
        ) : (
          undefined
        );
      // только человек с максимальным уровнем доступа к проекту может редактировать accessLevel Других пользовтаелей
      COLUMNS[6].editable = openedAccessLevel >= ACCESS_LEVEL.VIOLET;
      // нельзя редактировать свой уровень доступа или уровень доступа человека, у которого максимальный уровень доступа
      COLUMNS[6].skip = item => {
        if (item) {
          return item.accessLevel === ACCESS_LEVEL.VIOLET || item.member.id === userId;
        }
        return true;
      };
      return COLUMNS;
    }, [openedAccessLevel, projectId, projectRoles, userId]);

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
