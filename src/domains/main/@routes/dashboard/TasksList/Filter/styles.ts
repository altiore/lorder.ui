import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    chip: {
      position: 'absolute',
      transition: theme.transitions.create(['bottom'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
      width: '100%',
    },
    filter: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-end',
      marginBottom: -16,
      position: 'relative',
      width: 144,
    },
    group: {
      display: 'flex',
    },
    grow: {
      grow: 1,
    },
    left: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex!important',
      },
    },
    pagination: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      height: 40,
      justifyContent: 'space-around',
      width: 144,
    },
    right: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex!important',
      },
    },
    root: {
      alignItems: 'flex-end',
      display: 'flex',
      height: 70,
      justifyContent: 'space-between',
      padding: '0 2px 8px',
    },
  });
