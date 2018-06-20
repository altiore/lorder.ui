import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
  },
});
