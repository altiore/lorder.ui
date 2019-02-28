import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.error.dark,
      marginBottom: -theme.spacing.unit / 2,
      marginLeft: theme.spacing.unit / 4,
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
