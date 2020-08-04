import React from 'react';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';

import { LinkButton } from '#/@common/link-button';

import { useStyles } from './style';

export const UserCard = ({ members }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.cardWrap}>
      <div className={classes.imgWrap}>
        <img className={classes.img} src={process.env.PUBLIC_URL + '/d-avatar.png'} alt="" />
      </div>
      <div className={classes.infoWrap}>
        <Grid container justify="space-between">
          <p className={classes.userName}>Разван Ломов</p>
          <span className={classes.font}>4 часа назад</span>
        </Grid>
        <div>
          <p className={classNames(classes.font, classes.descriptionSpacing)}>
            Исправление ошибок на доске пользователя
          </p>
        </div>
        <LinkButton to="/" className={classes.linkButton}>
          Ссылка на проект
        </LinkButton>
      </div>
    </div>
  );
};
