import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Page } from '@components/page';

import { Project } from '#/@store/projects';

import { ACCESS_LEVEL } from '@types';

interface IProjectInvite {
  acceptInvitation: () => void;
  openedAccessLevel?: ACCESS_LEVEL;
  openedProject: Project;
}

export const ProjectInviteJsx: React.FC<IProjectInvite> = ({ acceptInvitation, openedProject }): JSX.Element => {
  return (
    <Page>
      <Typography variant="h3">
        Архитектор проекта <b>{openedProject.title}</b> приглашает вас стать участником этого проекта
      </Typography>

      <Typography>Вы можете принять приглашение, или отказаться от участия в проекте</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button onClick={acceptInvitation} variant="outlined">
            Принять приглашение
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
};
