import React from 'react';

import { Box, Grid } from '@material-ui/core';

import ButtonEdit from '@components/button-edit';
import GradientHead from '@components/gradient-head';

import LogoField from './logo-field';
import { useStyles } from './styles';
import ProjectLogo from './time.png';

import { ACCESS_LEVEL, IProject } from '@types';

interface IprojectHeadProps {
  project: IProject;
  editProjectLink: string;
  isAuth: boolean;
}

export const ProjectHeadTsx = ({ project, editProjectLink, isAuth }: IprojectHeadProps) => {
  const { firstBlock, firstBlockContent, imageWrap, projectName, projectTagline, wrapper } = useStyles();
  return (
    <GradientHead className={wrapper}>
      <Grid item xs={12} sm={6} md={8}>
        <div className={firstBlock}>
          <LogoField
            isEditable={project.accessLevel === ACCESS_LEVEL.VIOLET}
            fileAlt={project?.logo?.title || project.title}
            fileUrl={project?.logo?.url}
          />
          <div className={firstBlockContent}>
            <h1 className={projectName}>{project.title}</h1>
            {project.desc && <p className={projectTagline}>{project.desc}</p>}
            {isAuth && <ButtonEdit routePath={editProjectLink}>Редактировать</ButtonEdit>}
          </div>
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
