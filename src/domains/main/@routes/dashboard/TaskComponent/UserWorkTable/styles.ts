import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
      cursor: 'pointer',
    },
    wrapper: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing.unit,
      padding: theme.spacing.unit,
    },
  });
