import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    play: {
      // backgroundColor: theme.palette.primary.light,
      backgroundColor: '#4BC800',
      // color: theme.palette.action.active,
      color: 'white',
      // minWidth: theme.spacing(6),
    },
    stop: {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.background.paper,
      // minWidth: theme.spacing(6),
    },
  });
