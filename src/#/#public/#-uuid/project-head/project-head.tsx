import React from 'react';

import { Box, Grid } from '@material-ui/core';

import ButtonEdit from '@components/button-edit';
import GradientHead from '@components/gradient-head';

import { ROUTE } from '#/@store/router';

import LogoField from './logo-field';
import { useStyles } from './styles';
import ProjectLogo from './time.png';

import { ACCESS_LEVEL, IProject } from '@types';

interface IProps {
  project: IProject;
  isAuth: boolean;
}

export const ProjectHeadTsx = ({ project, isAuth }: IProps) => {
  const { firstBlock, firstBlockContent, imageWrap, projectName, projectTagLine, wrapper } = useStyles();
  return (
    <GradientHead color={project?.viewColor} className={wrapper}>
      <Grid item xs={12} sm={6} md={8}>
        <div className={firstBlock}>
          <LogoField
            isEditable={project.accessLevel === ACCESS_LEVEL.VIOLET}
            fileAlt={project?.logo?.title || project.title}
            fileUrl={project?.logo?.url}
          />
          <div className={firstBlockContent}>
            <h1 className={projectName}>{project.title}</h1>
            {project.desc && <p className={projectTagLine}>{project.desc}</p>}
            {isAuth && (
              <ButtonEdit
                to={
                  Boolean(project?.accessLevel && project.accessLevel >= ACCESS_LEVEL.VIOLET)
                    ? ROUTE.PROJECT.SETTINGS(project.id)
                    : undefined
                }
              >
                Редактировать
              </ButtonEdit>
            )}
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
