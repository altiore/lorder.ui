import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    report: {
      bottom: theme.spacing(2),
      cursor: 'pointer',
      left: theme.spacing(2),
      position: 'absolute',
      zIndex: 10000,
    },
  });
