import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginLeft: 4,
      minWidth: 140,
      textTransform: 'none',
    },
  });
