import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  play: {
    backgroundColor: '#4BC800',
    borderRadius: theme.shape.borderRadius,
    color: 'white',
    height: 34,
    marginLeft: theme.spacing(3),
    minHeight: 34,
    width: 34,
  },
  stop: {
    backgroundColor: theme.palette.error.dark,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.background.paper,
    height: 34,
    marginLeft: theme.spacing(3),
    minHeight: 34,
    width: 34,
  },
}));
