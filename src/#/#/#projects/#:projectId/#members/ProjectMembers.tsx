import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import get from 'lodash/get';

import { Page } from '@components/Page';

import Crud from '#/@common/Crud';
import { ACCESS_LEVEL } from '#/@store/projects';

export interface IProjectMembersProps extends RouteComponentProps {
  createItem: any;
  deleteItem: any;
  deleteManyItems: any;
  fetchItems?: any;
  list: any[];
}

const getUserId = el => get(el, ['member', 'id']);

const STATUS = {
  1: 'Нет',
  10: 'Да',
};

const COLUMNS = [
  { title: 'Имя', path: 'member.displayName' },
  { title: 'E-mail', path: 'member.email' },
  { title: 'Активен', path: 'member.status', allowed: STATUS },
  { title: 'Уровень доступа', path: 'accessLevel', allowed: ACCESS_LEVEL },
];

export const ProjectMembersJsx: React.FC<IProjectMembersProps> = ({
  createItem,
  deleteItem,
  deleteManyItems,
  fetchItems,
  list,
}) => {
  useEffect(() => {
    if (fetchItems) {
      fetchItems();
    }
  }, [fetchItems]);

  const preparedList = useMemo(() => {
    return get(list, 'list');
  }, [list]);

  return (
    <Page>
      <Crud
        formName={'CreateProjectMemberForm'}
        entityName="Участник"
        createItem={createItem}
        deleteItem={deleteItem}
        deleteBulk={deleteManyItems}
        getId={getUserId}
        columns={COLUMNS}
        rows={preparedList}
      />
    </Page>
  );
};
