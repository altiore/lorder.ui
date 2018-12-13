import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    input: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 3,
      height: 20,
      marginRight: 10,
      padding: 3,
      textAlign: 'right',
      width: 80,
    },
    inputWrapper: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 5,
      padding: '5px 10px',
    },
    popover: {
      zIndex: 1203,
    },
  });
