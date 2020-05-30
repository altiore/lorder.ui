import React from 'react';
import MediaQuery from 'react-responsive';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import BoardPng from './board.png';

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
    padding: theme.spacing(2),
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 521,
    justifyContent: 'space-around',
    maxWidth: 820,
    overflow: 'hidden',
    padding: theme.spacing(0, 1, 1),
    [theme.breakpoints.down('sm')]: {
      height: 480,
      padding: theme.spacing(0, 0, 1),
    },
  },
  text: {
    textAlign: 'center',
  },
}));

interface IPlaceHolder {
  loading: boolean;
}

export const PlaceHolderJsx: React.FC<IPlaceHolder> = ({ loading }) => {
  const theme = useTheme();

  const { image, imageWrap, root, text } = useStyles();

  return (
    <div className={root}>
      {loading ? (
        <CircularProgress color="secondary" size={140} />
      ) : (
        <>
          <MediaQuery minWidth={theme.breakpoints.values.md}>
            <div className={imageWrap}>
              <img alt="Пример доски пользователя" className={image} src={BoardPng} />
            </div>
          </MediaQuery>
          <div className={text}>
            <Typography variant="h3">Нажмите на кнопку ниже,</Typography>
            <Typography variant="h3">чтоб начать первую задачу</Typography>
          </div>
        </>
      )}
    </div>
  );
};
