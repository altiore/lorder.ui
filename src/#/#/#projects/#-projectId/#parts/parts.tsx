import React, { useCallback, useEffect, useMemo } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { ICrudColumn } from '@components/crud/crud';
import { Page } from '@components/page';
import RadioButton from '@components/radio-button';

import Crud from '#/@common/crud';

import TreeView from './tree-view';

import { IProjectPart } from '@types';

export interface IProjectPartsProps extends RouteComponentProps<{ projectId: string }> {
  createProjectPart: (data: Omit<IProjectPart, 'id' | 'projectId'>) => any;
  deleteProjectPart: any;
  fetchProjectParts?: any;
  getProjectParts: (pId: number) => IProjectPart[];
  getProjectPartsTree: (pId: number) => any[];
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

export const ProjectPartsJsx: React.FC<IProjectPartsProps> = React.memo<IProjectPartsProps>(
  ({
    createProjectPart,
    deleteProjectPart,
    fetchProjectParts,
    getProjectParts,
    getProjectPartsTree,
    location,
    match,
    push,
  }) => {
    const projectId = useMemo(() => {
      return parseInt(match?.params?.projectId, 0);
    }, [match]);

    useEffect(() => {
      if (fetchProjectParts) {
        fetchProjectParts(projectId);
      }
    }, [fetchProjectParts, projectId]);

    const projectParts = useMemo(() => getProjectParts(projectId), [getProjectParts, projectId]);

    const projectPartsTree = useMemo(() => getProjectPartsTree(projectId), [getProjectPartsTree, projectId]);

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

    const FilterButtons = () => <RadioButton onChange={handleChange} items={items} value={page} />;

    return (
      <Page>
        <Switch>
          <Redirect to={match.path + '/table'} from={match.path} exact />
          <Route path={[match.path, VIEW.TABLE].join('/')}>
            <Crud
              formName={'CreateProjectPartForm'}
              entityName="Части проекта"
              createTitle="Добавить"
              createItem={createProjectPart}
              deleteItem={deleteProjectPart}
              FilterComponent={FilterButtons}
              columns={preparedColumns}
              rows={projectParts}
            />
          </Route>
          <Route path={[match.path, VIEW.TREE].join('/')}>
            <RadioButton onChange={handleChange} items={items} value={page} />
            <TreeView data={projectPartsTree} />
          </Route>
        </Switch>
      </Page>
    );
  }
);
