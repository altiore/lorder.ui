import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    close: {
      marginLeft: theme.spacing(1),
    },
    divider: {
      height: 28,
      margin: 4,
      width: 1,
    },
    filterBadge: {
      color: theme.palette.error.main,
      fontWeight: 'bold',
    },
    iconButton: {
      padding: 10,
    },
    input: {
      flex: 1,
      marginLeft: 8,
    },
    members: {
      alignItems: 'space-between',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      float: 'right',
      justifyContent: 'flex-end',
      margin: 0,
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeIn,
      }),
      width: '48px',
    },
    rootOpen: {
      backgroundColor: theme.palette.primary.main,
      float: 'none',
      height: 56,
      left: 86,
      position: 'absolute',
      top: 4,
      width: 'calc(100% - 110px)',
      zIndex: 1300,
    },
    search: {
      alignItems: 'center',
      display: 'flex',
      padding: '2px 4px',
      width: 400,
    },
  });
