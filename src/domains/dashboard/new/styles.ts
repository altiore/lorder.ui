import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  root: {
    flexGrow: 1,
  },
});
