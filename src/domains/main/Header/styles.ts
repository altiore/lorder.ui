import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
      zIndex: theme.zIndex.drawer + 1,
    },
    avatar: {
      cursor: 'pointer',
      margin: '10px 14px',
    },
    buttonBlock: {
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    expandButton: {
      marginLeft: theme.spacing.unit,
    },
    grow: {
      flexGrow: 1,
    },
  });
