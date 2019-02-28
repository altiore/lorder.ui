import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    actions: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
    card: {
      backgroundColor: theme.palette.background.default,
      borderRadius: 2,
      boxSizing: 'border-box',
      color: theme.palette.text.primary,
      display: 'inline-block',

      minHeight: 400,
      padding: '10px 25px 15px 8px',
      position: 'relative',
      textAlign: 'left',
      width: '100%',
      zIndex: 25,
      [theme.breakpoints.up('lg')]: {
        minWidth: 1040,
      },
    },
    cardFirst: {
      boxSizing: 'border-box',
      flexBasis: '75%',
      flexGrow: 2,
      paddingRight: theme.spacing.unit,
    },
    cardForm: {
      display: 'flex',
      flexFlow: 'row wrap',
    },
    cardSecond: {
      boxSizing: 'border-box',
      flexBasis: '25%',
      flexGrow: 1,
      paddingLeft: theme.spacing.unit,
    },
    field: {
      paddingLeft: theme.spacing.unit * 4,
    },
    grow: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing.unit,
    },
    row: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
    },
  });
