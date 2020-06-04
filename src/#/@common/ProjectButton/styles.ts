import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    '&:hover': {
      backgroundColor: '#313130',
    },
    backgroundColor: theme.palette.default.main,
    height: 38,
    marginLeft: 4,
    padding: theme.spacing(0, 3),
    position: 'relative',
    textTransform: 'none',
    zIndex: 2,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      maxWidth: 158,
      padding: theme.spacing(0, 2),
    },
  },
  hiddenStyle: {
    height: 30,
    marginLeft: '-10%',
    opacity: 0.65,
    zIndex: 1,
  },
  inProgressStyle: {
    backgroundColor: theme.palette.error.dark,
    borderRadius: 6,
    height: 6,
    position: 'absolute',
    right: 9,
    top: 6,
    width: 6,
    [theme.breakpoints.down('sm')]: {
      right: 5,
    },
  },
  inProgressStyleGreen: {
    backgroundColor: '#c2ff38',
  },
  text: {
    color: theme.palette.secondary.light,
  },
}));
