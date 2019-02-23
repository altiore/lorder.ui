import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    report: {
      bottom: theme.spacing.unit,
      cursor: 'pointer',
      left: theme.spacing.unit * 2,
      position: 'fixed',
      zIndex: 10000,
    },
  });
