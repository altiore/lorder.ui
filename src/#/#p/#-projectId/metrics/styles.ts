import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#f6f8fa',
    padding: theme.spacing(3, 0),
  },
  tableWrap: {
    margin: theme.spacing(3, 5),
    maxWidth: 400,
    width: '100%',
  },
}));
