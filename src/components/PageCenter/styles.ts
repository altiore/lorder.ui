import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      margin: `${theme.spacing.unit * 3}px auto`,
      maxWidth: theme.mainContent.width,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        padding: theme.spacing.unit,
      },
    },
  });
