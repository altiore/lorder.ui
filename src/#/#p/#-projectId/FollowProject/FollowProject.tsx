import React, { useCallback, useState } from 'react';

import classNames from 'classnames';

import { Box, Button, Grid, MenuItem, Select, TextField } from '@material-ui/core';

import { useStyles } from './styles';

import { IProject, IUserRole } from '@types';

interface IfollowProject {
  project: IProject;
  roles: IUserRole[];
  verticalDirection?: boolean;
}

export const FollowProjectTsx = ({ project, roles, verticalDirection = false }: IfollowProject) => {
  const [role, setRole] = useState('role');
  const handleSelect = useCallback((e: any) => {
    setRole(e.target.value);
  }, []);

  const classes = useStyles();
  if (!project.slogan) {
    return null;
  }

  return (
    <Box className={verticalDirection ? classes.followWrapVertical : classes.followWrap}>
      {project.slogan && (
        <h2
          className={
            verticalDirection ? classNames(classes.taglineHeader, classes.taglineHeaderVertical) : classes.taglineHeader
          }
        >
          {project.slogan}
        </h2>
      )}
      <Grid
        container
        justify="space-around"
        alignItems="center"
        className={
          verticalDirection ? classNames(classes.buttonsWrap, classes.buttonsWrapVertical) : classes.buttonsWrap
        }
      >
        <TextField
          className={
            verticalDirection ? classNames(classes.emailInput, classes.emailInputVertical) : classes.emailInput
          }
          name="e-mail"
          placeholder="E-mail"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.emailInnerInput,
              root: classes.emailInnerInput,
            },
          }}
        />
        <Select
          value={role}
          className={verticalDirection ? classNames(classes.select, classes.selectVertical) : classes.select}
          inputProps={{
            className:
              role === 'role' ? classNames(classes.innerSelectPlaceholder, classes.innerSelect) : classes.innerSelect,
          }}
          onChange={handleSelect}
        >
          <MenuItem value="role" disabled>
            Выбрать роль
          </MenuItem>
          {roles.map(r => (
            <MenuItem value={r.id} key={r.id}>
              {r.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          color="primary"
          variant="contained"
          className={
            verticalDirection ? classNames(classes.followButton, classes.followButtonVertical) : classes.followButton
          }
        >
          Подключиться к проекту
        </Button>
      </Grid>
    </Box>
  );
};
