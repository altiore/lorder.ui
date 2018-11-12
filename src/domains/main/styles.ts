import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexGrow: 1,
    },
    root: {
      display: 'flex',
      flexFlow: 'column nowrap',
      flexGrow: 1,
    },
  });
