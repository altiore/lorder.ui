import React, { useCallback, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import classNames from 'classnames';

import { Box, Button, Grid, MenuItem, Select, TextField } from '@material-ui/core';

import { useStyles } from './styles';

import { IMember } from '@types';
import { IProject, IUserRole } from '@types';

interface IPublicProjectMember extends IMember {
  memberId: number;
  projectId: number;
}

interface IFollowProject extends RouteComponentProps {
  project: IProject;
  roles: IUserRole[];
  verticalDirection?: boolean;
  postRequestMembership: any;
  projectId: number | undefined;
  members: IPublicProjectMember[];
  isAuth: boolean;
  userEmail: string | undefined;
  userId: number;
}

export const FollowProjectTsx = ({
  project,
  roles,
  verticalDirection = false,
  postRequestMembership,
  projectId,
  members,
  isAuth,
  userEmail,
  userId,
  history,
}: IFollowProject) => {
  const [role, setRole] = useState('role');
  const isMemberConnected = useMemo(() => {
    return members.map(({ memberId }) => memberId).includes(userId);
  }, [members, userId]);
  const handleSelect = useCallback((e: any) => {
    setRole(e.target.value);
  }, []);
  const handleRequestMembership = useCallback(() => {
    if (isAuth) {
      postRequestMembership(projectId, role);
    } else {
      history.push('/login');
    }
  }, [history, isAuth, postRequestMembership, projectId, role]);
  const classes = useStyles();
  if (!project.slogan) {
    return null;
  }

  if (isMemberConnected) {
    return null;
  }

  return (
    <Box className={verticalDirection ? classes.followWrapVertical : classes.followWrap}>
      {project.slogan && (
        <h2
          className={classNames({
            [classes.taglineHeader]: true,
            [classes.taglineHeaderVertical]: verticalDirection,
          })}
        >
          {project.slogan}
        </h2>
      )}
      <Grid
        container
        justify="space-around"
        alignItems="center"
        className={classNames({
          [classes.buttonsWrap]: true,
          [classes.buttonsWrapVertical]: verticalDirection,
        })}
      >
        <TextField
          value={userEmail}
          disabled
          className={classNames({
            [classes.emailInput]: true,
            [classes.emailInputVertical]: verticalDirection,
          })}
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
          className={classNames({
            [classes.select]: true,
            [classes.selectVertical]: verticalDirection,
          })}
          inputProps={{
            className: classNames({
              [classes.innerSelectColor]: role === 'role',
              [classes.innerSelect]: true,
            }),
          }}
          onChange={handleSelect}
        >
          <MenuItem value="role" disabled>
            Выбрать роль
          </MenuItem>
          {roles &&
            roles.map(({ role: { id, name } }: any) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
        </Select>
        <Button
          color="primary"
          variant="contained"
          onClick={handleRequestMembership}
          className={classNames({
            [classes.followButton]: true,
            [classes.followButtonVertical]: verticalDirection,
          })}
        >
          Подключиться к проекту
        </Button>
      </Grid>
    </Box>
  );
};
