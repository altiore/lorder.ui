import React, { useCallback, useMemo } from 'react';

import get from 'lodash/get';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Page from '@components/page';

import { LinkButton } from '#/@common/link-button';
import { Project } from '#/@store/projects';
import { ROUTE } from '#/@store/router';

import ProjectForm from './project-form';

export interface ISettingsProps {
  openedProject?: Project;
  projectId?: number;
  isLoading: boolean;
  publishProject: (p: number) => any;
  updateStatistic: (p: number) => any;
}

export const SettingsTsx: React.FunctionComponent<ISettingsProps> = ({
  openedProject,
  projectId,
  publishProject,
  updateStatistic,
  isLoading,
}) => {
  const handlePublishProject = useCallback(() => {
    if (typeof projectId === 'number') {
      publishProject(projectId);
    }
  }, [projectId, publishProject]);

  const handleUpdateStatistic = useCallback(() => {
    if (typeof projectId === 'number') {
      updateStatistic(projectId);
    }
  }, [projectId, updateStatistic]);

  const projectUuid: string | undefined = useMemo(() => {
    return get(openedProject, 'uuid');
  }, [openedProject]);

  return (
    <Page>
      <Grid container>
        <Grid item xs={12} md={8}>
          <ProjectForm />
        </Grid>
        <Grid item xs={12} md={4} style={{ display: 'flex', flexFlow: 'column nowrap' }}>
          {projectUuid ? (
            <LinkButton to={ROUTE.PUBLIC.ONE(projectUuid)}>Открыть статистику проекта</LinkButton>
          ) : (
            <Button onClick={handlePublishProject}>Опубликовать проект</Button>
          )}
          <Button onClick={handleUpdateStatistic} disabled={isLoading}>
            Обновить статистику проекта
          </Button>
          {isLoading && <span style={{ textAlign: 'center' }}>Статистика обновляется</span>}
        </Grid>
      </Grid>
    </Page>
  );
};
