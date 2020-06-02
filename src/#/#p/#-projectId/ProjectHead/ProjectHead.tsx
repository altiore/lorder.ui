import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import SettingsIcon from '@components/@icons/Settings';

import { LinkButton } from '#/@common/LinkButton';

import ProjectLogo from '../data/time.png';
import { useStyles } from './styles';

import { IProject } from '@types';

interface IprojectHeadProps {
  project: IProject;
  editProjectLink: string;
  isAuth: boolean;
}

export const ProjectHeadTsx = ({ project, editProjectLink, isAuth }: IprojectHeadProps) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.projectHeadWrap} alignItems="center" justify="center">
      <Grid container alignItems="center" justify="space-between" className={classes.contentWrap}>
        <Grid item xs={12} sm={6}>
          <div>
            <h1 className={classes.projectName}>{project.title}</h1>
            {project.desc && <p className={classes.projectTagline}>{project.desc}</p>}
            {isAuth && (
              <LinkButton to={editProjectLink} className={classes.editButton}>
                <SettingsIcon className={classes.settingsIcon} />
                <Typography className={classes.editButtonText}>Редактировать</Typography>
              </LinkButton>
            )}
          </div>
        </Grid>
        <Box className={classes.imageWrap}>
          <img src={ProjectLogo} alt={project.title} />
        </Box>
      </Grid>
    </Grid>
  );
};
