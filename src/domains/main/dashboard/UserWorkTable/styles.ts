import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    play: {
      // backgroundColor: theme.palette.primary.light,
      backgroundColor: '#4BC800',
      // color: theme.palette.action.active,
      color: 'white',
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
      cursor: 'pointer',
    },
    stop: {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.background.paper,
    },
  });
