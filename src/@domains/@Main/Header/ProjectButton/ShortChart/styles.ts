import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    list: {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      textAlign: 'center',
    },
  });
