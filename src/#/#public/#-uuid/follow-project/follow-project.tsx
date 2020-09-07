import React, { useMemo } from 'react';

import classNames from 'classnames';
import { Field, InjectedFormProps } from 'redux-form';
import { email, required } from 'redux-form-validators';

import { Box, Button, Grid, Typography } from '@material-ui/core';

import InputField from '@components/input-field';

import RoleSelect from './role-select';
import { useStyles } from './styles';

import { ACCESS_LEVEL, IMember, IProject } from '@types';

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
  const currentMember = useMemo(() => {
    return members.find(el => el.memberId === userId);
  }, [members, userId]);

  const isMemberConnected = useMemo(() => {
    return Boolean(currentMember);
  }, [currentMember]);

  const isRequestSent = useMemo(() => {
    return currentMember && currentMember.accessLevel < ACCESS_LEVEL.WHITE;
  }, [currentMember]);

  const {
    buttonsWrap,
    buttonsWrapVertical,
    emailInnerInput,
    emailInput,
    emailInputVertical,
    followButtonVertical,
    followWrap,
    followWrapVertical,
    outlinedStyle,
    requestSent,
    taglineHeader,
    taglineHeaderVertical,
  } = useStyles();

  if (isMemberConnected) {
    if (isRequestSent) {
      return (
        <Box component="form" onSubmit={handleSubmit} className={verticalDirection ? followWrapVertical : followWrap}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classNames(buttonsWrap, {
              [buttonsWrapVertical]: verticalDirection,
            })}
          >
            <Typography className={requestSent} variant="h3">
              Запрос на подключение к проекту отправлен!
            </Typography>
            <Typography variant="h5">Команда проекта примет решение о вашем подключении в ближайшее время</Typography>
          </Grid>
        </Box>
      );
    }
    return null;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className={verticalDirection ? followWrapVertical : followWrap}>
      <h2
        className={classNames({
          [taglineHeader]: true,
          [taglineHeaderVertical]: verticalDirection,
        })}
      >
        {project.slogan || 'Хочешь к нам? Присоединяйся!'}
      </h2>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classNames(buttonsWrap, {
          [buttonsWrapVertical]: verticalDirection,
        })}
      >
        {!isAuth && (
          <Field
            name="email"
            label="Email"
            component={InputField}
            className={classNames(emailInput, {
              [emailInputVertical]: verticalDirection,
            })}
            placeholder="E-mail"
            variant="outlined"
            InputProps={{
              classes: {
                root: emailInnerInput,
              },
            }}
            InputLabelProps={{ classes: { outlined: outlinedStyle } }}
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
          labelProps={{ classes: { outlined: outlinedStyle } }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          className={classNames({
            [followButtonVertical]: verticalDirection,
          })}
        >
          Подключиться к проекту
        </Button>
      </Grid>
    </Box>
  );
};
