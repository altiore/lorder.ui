import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  appBarRoot: {
    zIndex: 1207,
  },
  buttonBlock: {
    display: 'flex',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  expandButton: {
    marginLeft: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  menu: {
    backgroundColor: theme.palette.default.dark,
  },
  timerIco: {
    color: theme.palette.secondary.main,
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));
