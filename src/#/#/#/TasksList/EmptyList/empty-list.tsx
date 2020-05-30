import React from 'react';
import MediaQuery from 'react-responsive';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EmptyListPng from './list.png';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    borderRadius: 6,
    width: 568,
  },
  imageWrap: {
    alignItems: 'center',
    borderRadius: 6,
    boxShadow: theme.shadow.default,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 369,
    justifyContent: 'space-around',
    maxWidth: 820,
    overflow: 'hidden',
    padding: theme.spacing(0, 1, 1),
    [theme.breakpoints.down('sm')]: {
      height: 328,
      padding: theme.spacing(0, 0, 1),
    },
  },
  text: {
    textAlign: 'center',
  },
}));

export const EmptyListJsx = () => {
  const theme = useTheme();

  const { image, imageWrap, root, text } = useStyles();

  return (
    <div className={root}>
      <MediaQuery minWidth={theme.breakpoints.values.md}>
        <div className={imageWrap}>
          <img alt="Пример доски пользователя" className={image} src={EmptyListPng} />
        </div>
      </MediaQuery>
      <div className={text}>
        <Typography variant="h4">Здесь появятся Ваши задачи</Typography>
        <Typography variant="subtitle2">
          Добавьте задачи в проект, или попросите Архитектора, чтоб увидеть список Ваших задач
        </Typography>
      </div>
    </div>
  );
};
