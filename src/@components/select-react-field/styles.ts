import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.error.dark,
      marginBottom: -theme.spacing(0.5),
      marginLeft: theme.spacing(0.25),
      position: 'absolute',
      top: -18,
    },
    root: {
      width: 320,
    },
    wrapper: {
      position: 'relative',
      width: '100%',
    },
  });
