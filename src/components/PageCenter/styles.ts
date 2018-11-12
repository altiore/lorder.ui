import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

const WIDTH = 1012;

export const styles = (theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      margin: '24px auto',
      maxWidth: WIDTH,
      padding: theme.spacing.unit * 2,
    },
  });
