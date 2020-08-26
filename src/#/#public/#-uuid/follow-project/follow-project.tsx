import React, { useMemo } from 'react';

import classNames from 'classnames';
import { Field, InjectedFormProps } from 'redux-form';
import { email, required } from 'redux-form-validators';

import { Box, Button, Grid } from '@material-ui/core';

import InputField from '@components/input-field';

import RoleSelect from './role-select';
import { useStyles } from './styles';

import { IMember, IProject } from '@types';

export interface IFollowProject {
  isAuth: boolean;
  members: IMember[];
  project: IProject;
  push: any;
  userId: number;
  verticalDirection?: boolean;
}

export interface IFollowFormProps {
  role: string;
}

export const FollowProjectTsx = ({
  handleSubmit,
  isAuth,
  members,
  project,
  userId,
  verticalDirection = false,
}: IFollowProject & InjectedFormProps<IFollowFormProps, IFollowProject>) => {
  const isMemberConnected = useMemo(() => {
    return members.map(({ memberId }) => memberId).includes(userId);
  }, [members, userId]);
  const classes = useStyles();

  if (isMemberConnected) {
    return null;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={verticalDirection ? classes.followWrapVertical : classes.followWrap}
    >
      <h2
        className={classNames({
          [classes.taglineHeader]: true,
          [classes.taglineHeaderVertical]: verticalDirection,
        })}
      >
        {project.slogan || 'Хочешь к нам? Присоединяйся!'}
      </h2>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classNames(classes.buttonsWrap, {
          [classes.buttonsWrapVertical]: verticalDirection,
        })}
      >
        {!isAuth && (
          <Field
            name="email"
            label="Email"
            component={InputField}
            className={classNames(classes.emailInput, {
              [classes.emailInputVertical]: verticalDirection,
            })}
            placeholder="E-mail"
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.emailInnerInput,
                root: classes.emailInnerInput,
              },
            }}
            InputLabelProps={{ classes: { outlined: classes.outlinedStyle } }}
            fullWidth={verticalDirection}
            validate={email({ msg: 'Должен быть корректный email-адрес' })}
          />
        )}
        <Field
          name="role"
          component={RoleSelect}
          fullWidth={verticalDirection}
          vertical={verticalDirection}
          validate={required({ msg: 'Обазательное поле' })}
          labelProps={{ classes: { outlined: classes.outlinedStyle } }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          className={classNames({
            [classes.followButtonVertical]: verticalDirection,
          })}
        >
          Подключиться к проекту
        </Button>
      </Grid>
    </Box>
  );
};
