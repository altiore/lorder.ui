import React, { useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ReactComponent as PlaySvg } from './play.svg';

interface ISupportForm {
  name?: string;
}

const IMG_SIZE = {
  height: 95,
  width: 95,
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  svgWrapper: {
    '& > svg': {
      height: IMG_SIZE.height * 2,
      width: IMG_SIZE.width * 2,
    },
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    height: IMG_SIZE.height * 2,
    justifyContent: 'center',
    width: IMG_SIZE.width * 2,
  },
}));

export const SupportForm: React.FC<ISupportForm> = () => {
  const { root, svgWrapper } = useStyles();

  const handleClick = useCallback(() => {
    alert('Видео недоступно');
  }, []);

  return (
    <Paper className={root} onClick={handleClick}>
      <div className={svgWrapper}>
        <PlaySvg />
      </div>
    </Paper>
  );
};
