import { Theme } from '@material-ui/core/styles';
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
    fabStyle: {
      '& svg': {
        color: theme.palette.primary.contrastText,
      },
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
      backgroundColor: '#f2d578',
      borderRadius: 15,
      boxShadow: '0 4px 10px rgba(242, 213, 120, 0.5)',
      height: '30px',
      minHeight: 0,
      width: '30px',
    },
    filter: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-end',
      marginBottom: -8,
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
      marginBottom: theme.spacing(1 / 2),
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
