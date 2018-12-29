import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
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
    menu: {
      backgroundColor: theme.palette.primary.dark,
    },
  });
