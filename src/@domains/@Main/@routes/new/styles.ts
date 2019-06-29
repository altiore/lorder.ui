import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    button: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(4),
      textAlign: 'center',
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
  });
