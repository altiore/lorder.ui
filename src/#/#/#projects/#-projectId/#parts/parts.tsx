import React, { useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { ICrudColumn } from '@components/crud/crud';
import { Page } from '@components/page';
import RadioButton from '@components/radio-button';

import Crud from '#/@common/crud';

import TreeView from './tree-view';

import { IProjectPart } from '@types';

export interface IProjectPartsProps extends RouteComponentProps {
  createProjectPart: (data: Omit<IProjectPart, 'id' | 'projectId'>) => any;
  deleteProjectPart: any;
  fetchProjectParts?: any;
  projectParts: any[];
  projectPartsTree: any[];
  push: (path: string) => void;
}

const COLUMNS: ICrudColumn[] = [
  { title: 'ID', path: 'id', isNumber: true },
  { title: 'Название', path: 'title', name: 'title' },
  { title: 'Родитель', path: 'parentId', isNumber: true, name: 'parentId' },
  { title: 'Задач', path: 'tasks.length', isNumber: true },
];

enum VIEW {
  TABLE = 'table',
  TREE = 'tree',
}

const items = [
  { title: 'Таблица', value: VIEW.TABLE },
  { title: 'Дерево', value: VIEW.TREE },
];

export const ProjectPartsJsx: React.FC<IProjectPartsProps> = React.memo(
  ({
    createProjectPart,
    deleteProjectPart,
    fetchProjectParts,
    location,
    match,
    projectParts,
    projectPartsTree,
    push,
  }) => {
    useEffect(() => {
      if (fetchProjectParts) {
        fetchProjectParts();
      }
    }, [fetchProjectParts]);

    const preparedColumns = useMemo(() => {
      return COLUMNS;
    }, []);

    const { url } = match;
    const { pathname } = location;

    const page = useMemo(() => {
      return pathname && pathname.match(VIEW.TREE) ? VIEW.TREE : VIEW.TABLE;
    }, [pathname]);

    const handleChange = useCallback(
      value => {
        push(`${url}/${value}`);
      },
      [push, url]
    );

    return (
      <Page>
        <RadioButton onChange={handleChange} items={items} value={page} />
        <Switch>
          <Redirect to={match.path + '/table'} from={match.path} exact />
          <Route path={[match.path, VIEW.TABLE].join('/')}>
            <Crud
              formName={'CreateProjectPartForm'}
              entityName="Части проекта"
              createTitle="Добавить"
              createItem={createProjectPart}
              deleteItem={deleteProjectPart}
              columns={preparedColumns}
              rows={projectParts}
            />
          </Route>
          <Route path={[match.path, VIEW.TREE].join('/')}>
            <TreeView data={projectPartsTree} />
          </Route>
        </Switch>
      </Page>
    );
  }
);
