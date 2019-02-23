import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: '10px',
    },
    avatarButton: {
      borderRadius: '50%',
    },
    item: {
      // backgroundColor: theme.palette.primary.light,
      // color: theme.palette.secondary.light,
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
    },
    menu: {
      zIndex: 1301,
    },
    menuPaper: {
      // backgroundColor: theme.palette.primary.dark,
    },
    paper: {
      marginRight: theme.spacing.unit * 2,
    },
    root: {
      display: 'flex',
    },
  });
