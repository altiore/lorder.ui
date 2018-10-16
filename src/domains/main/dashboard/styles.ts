import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    button: {
      // backgroundColor: theme.palette.primary.light,
      backgroundColor: '#4BC800',
      // color: theme.palette.action.active,
      color: 'white',
      margin: theme.spacing.unit,
    },
    input: {
      marginBottom: 20,
      width: 300,
    },
    play: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
    },
  });
