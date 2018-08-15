import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  root: {
    flexGrow: 1,
    padding: '0 24px',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
});
