import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    cell: {
      textAlign: 'center',
    },
    paper: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(4),
      textAlign: 'center',
    },
    root: {
      flexGrow: 1,
      padding: '0 24px',
    },
  });
