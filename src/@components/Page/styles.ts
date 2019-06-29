import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing( 4),
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5),
      },
    },
    root: {
      flexGrow: 1,
      padding: `0 ${theme.spacing(3)}px`,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
  });
