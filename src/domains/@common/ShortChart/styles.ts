import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      textAlign: 'center',
    },
  });
