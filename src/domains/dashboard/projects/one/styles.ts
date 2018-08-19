import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: '0 24px',
      padding: '0 24px',
    },
  });
