import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing.unit * 4,
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing.unit / 2,
      },
    },
    root: {
      flexGrow: 1,
      padding: `0 ${theme.spacing.unit * 3}px`,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
  });
