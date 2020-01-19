import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    filter: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  });
