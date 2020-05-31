import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: 4,
    padding: theme.spacing(0, 3),
    position: 'relative',
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      maxWidth: 158,
      padding: theme.spacing(0, 2),
    },
  },
  inProgress: {
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
  inProgressGreen: {
    backgroundColor: '#c2ff38',
  },
  projectPopover: {
    zIndex: 1402,
  },
  text: {
    color: theme.palette.secondary.light,
  },
}));
