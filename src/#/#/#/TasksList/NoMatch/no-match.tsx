import React, { useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2, 2, 3),
    textAlign: 'center',
    width: '100%',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    height: 369,
    justifyContent: 'flex-start',
    maxWidth: 820,
    overflow: 'hidden',
    padding: theme.spacing(0),
  },
  text: {
    textAlign: 'center',
  },
}));

interface INoMatch {
  refreshAll: () => any;
}

export const NoMatchJsx: React.FC<INoMatch> = ({ refreshAll }) => {
  const handleRefresh = useCallback(() => {
    if (refreshAll) {
      refreshAll();
    }
  }, [refreshAll]);

  const { button, paper, root } = useStyles();

  return (
    <div className={root}>
      <Paper elevation={2} className={paper}>
        <Typography variant="subtitle1">Нет совпадений</Typography>
        <Button className={button} onClick={handleRefresh} variant="outlined">
          Очистить фильтры
        </Button>
      </Paper>
    </div>
  );
};
