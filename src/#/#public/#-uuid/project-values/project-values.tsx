import React from 'react';

import { Container, Grid } from '@material-ui/core';

import HeaderWithButton from './header-with-button';
import { useStyles } from './styles';
import ValueDescriptionCard from './value-description-card';

import { ACCESS_LEVEL, IProject } from '@types';

interface IProps {
  project: IProject;
}

export const ProjectValues = ({ project }: IProps) => {
  const { sectionWrap } = useStyles();
  return (
    <section className={sectionWrap}>
      <Container maxWidth="lg">
        <HeaderWithButton
          title="ЦЕННОСТИ ПРОЕКТА"
          buttonText="Редактировать"
          marginBottom={42}
          to={project?.accessLevel && project.accessLevel >= ACCESS_LEVEL.VIOLET ? undefined : undefined}
        />
        <Grid container justify="center">
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
          <ValueDescriptionCard title="Заголовок">Главная ценность - это человек!</ValueDescriptionCard>
        </Grid>
      </Container>
    </section>
  );
};
