import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      margin: '24px auto',
      maxWidth: theme.mainContent.width,
      padding: theme.spacing.unit * 2,
    },
  });
