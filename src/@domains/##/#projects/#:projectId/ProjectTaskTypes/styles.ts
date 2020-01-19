import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: '600px',
      padding: theme.spacing(3),
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
      cursor: 'pointer',
    },
  });
