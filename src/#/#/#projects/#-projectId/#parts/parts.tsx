import React, { useEffect, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ICrudColumn } from '@components/Crud';
import { Page } from '@components/Page';

import Crud from '#/@common/Crud';

import { IProjectPart } from '@types';

export interface IProjectPartsProps extends RouteComponentProps {
  createProjectPart: (data: Omit<IProjectPart, 'id' | 'projectId'>) => any;
  deleteProjectPart: any;
  fetchProjectParts?: any;
  projectParts: any[];
}

const COLUMNS: ICrudColumn[] = [
  { title: 'ID', path: 'id' },
  { title: 'Название', path: 'title', name: 'title' },
  { title: 'Родитель', path: 'parentId' },
  // { title: 'Цвет', path: 'color' },
];

export const ProjectPartsJsx: React.FC<IProjectPartsProps> = React.memo(
  ({ createProjectPart, deleteProjectPart, fetchProjectParts, projectParts }) => {
    useEffect(() => {
      if (fetchProjectParts) {
        fetchProjectParts();
      }
    }, [fetchProjectParts]);

    const preparedColumns = useMemo(() => {
      return COLUMNS;
    }, []);

    return (
      <Page>
        <Crud
          formName={'CreateProjectPartForm'}
          entityName="Части проекта"
          createTitle="Добавить"
          createItem={createProjectPart}
          deleteItem={deleteProjectPart}
          columns={preparedColumns}
          rows={projectParts}
        />
      </Page>
    );
  }
);
