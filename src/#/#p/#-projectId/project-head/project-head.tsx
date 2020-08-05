import React from 'react';

import { Box, Grid } from '@material-ui/core';

import ButtonEdit from '@components/button-edit';
import GradientHead from '@components/gradient-head';

import { useStyles } from './styles';
import ProjectLogo from './time.png';

import { IProject } from '@types';

interface IprojectHeadProps {
  project: IProject;
  editProjectLink: string;
  isAuth: boolean;
}

export const ProjectHeadTsx = ({ project, editProjectLink, isAuth }: IprojectHeadProps) => {
  const { firstBlockContent, imageWrap, projectName, projectTagline } = useStyles();
  return (
    <GradientHead>
      <Grid item xs={12} sm={6} md={8}>
        <div className={firstBlockContent}>
          <h1 className={projectName}>{project.title}</h1>
          {project.desc && <p className={projectTagline}>{project.desc}</p>}
          {isAuth && <ButtonEdit routePath={editProjectLink}>Редактировать</ButtonEdit>}
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box className={imageWrap}>
          <img src={ProjectLogo} alt={project.title} />
        </Box>
      </Grid>
    </GradientHead>
  );
};
