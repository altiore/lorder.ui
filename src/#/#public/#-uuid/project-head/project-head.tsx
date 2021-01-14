import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { scroller } from 'react-scroll';

import { Box, Button, Grid } from '@material-ui/core';

import ButtonEdit from '@components/button-edit';
import GradientHead from '@components/gradient-head';

import { ROUTE } from '#/@store/router';

import LogoField from './logo-field';
import { useStyles } from './styles';
import ProjectLogo from './time.png';

import { ACCESS_LEVEL, IMember, IProject } from '@types';

interface IProps {
  project: IProject;
  isAuth: boolean;
  userId: number;
  members: IMember[];
}

export const ProjectHeadTsx = ({ project, isAuth, userId, members }: IProps) => {
  const isCurUserViolet = useMemo(() => {
    return Boolean(project?.accessLevel && project.accessLevel >= ACCESS_LEVEL.VIOLET);
  }, [project]);

  const [projectMember, setProjectMember] = useState(members.some(e => e.memberId === userId));

  useEffect(() => {
    setProjectMember(members.some(e => e.memberId === userId));
  }, [userId, members]);

  const scrollToConnect = useCallback(() => {
    scroller.scrollTo('connectForm', { delay: 100, smooth: true });
  }, []);

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
            {members.some(e => e.memberId === userId)}
            {isAuth && projectMember ? (
              <ButtonEdit to={isCurUserViolet ? ROUTE.PROJECT.SETTINGS(project.id) : ROUTE.PROJECT.ONE(project.id)}>
                {isCurUserViolet ? 'Редактировать' : 'Доска Проекта'}
              </ButtonEdit>
            ) : (
              <Button type="submit" color="primary" variant="contained" onClick={scrollToConnect}>
                Подключиться к проекту
              </Button>
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
