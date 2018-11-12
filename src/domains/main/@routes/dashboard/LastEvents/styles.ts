import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    list: {
      color: theme.palette.grey['500'],
      textAlign: 'center',
    },
  });
