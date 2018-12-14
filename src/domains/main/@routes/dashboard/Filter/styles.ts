import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    filter: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    grow: {
      grow: 1,
    },
    left: {
      marginRight: theme.spacing.unit,
    },
    right: {
      marginLeft: theme.spacing.unit,
    },
  });
