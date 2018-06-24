import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  cube: {
    marginTop: 50,
  },
  digit: {
    fontSize: 300,
    margin: '0 20px',
  },
  item: {
    alignItems: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    height: '50%',
    justifyContent: 'center',
  },
  points: {
    width: 240,
  },
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '100%',
  },
});