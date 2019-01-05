import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: theme.palette.background.default,
      borderRadius: 2,
      boxSizing: 'border-box',
      color: theme.palette.text.primary,
      display: 'inline-block',

      minHeight: 400,
      padding: '10px 25px 15px 16px',
      position: 'relative',
      textAlign: 'left',
      width: '100%',
      zIndex: 25,
      [theme.breakpoints.up('lg')]: {
        minWidth: 600,
      },
    },
    field: {
      paddingLeft: theme.spacing.unit * 4,
    },
    header: {
      paddingLeft: 7,
      width: '94%',
    },
  });
