import React, { useCallback, useState } from 'react';

import { Box, Button, Grid, MenuItem, Select, TextField } from '@material-ui/core';

import { useStyles } from './styles';

import { IProject, IUserRole } from '@types';

interface IfollowProject {
  project: IProject;
  roles: IUserRole[];
}

export const FollowProjectTsx = ({ project, roles }: IfollowProject) => {
  const [role, setRole] = useState('role');
  const handleSelect = useCallback((e: any) => {
    setRole(e.target.value);
  }, []);

  const classes = useStyles();
  if (!project.slogan) {
    return null;
  }

  return (
    <Box className={classes.followWrap}>
      {project.slogan && <h2 className={classes.taglineHeader}>{project.slogan}</h2>}
      <Grid container justify="space-around" alignItems="center" className={classes.buttonsWrap}>
        <TextField
          className={classes.emailInput}
          name="e-mail"
          placeholder="email"
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
          placeholder="Выбрать"
          className={classes.select}
          inputProps={{ className: classes.innerSelect }}
          onChange={handleSelect}
        >
          <MenuItem value="role">Выбрать роль</MenuItem>
          {roles.map(role => (
            <MenuItem value={role.id} key={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
        <Button color="primary" variant="contained" className={classes.followButton}>
          Подключиться к проекту
        </Button>
      </Grid>
    </Box>
  );
};
