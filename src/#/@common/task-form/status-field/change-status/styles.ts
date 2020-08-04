import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  forward: {
    color: '#63BA3B',
    paddingRight: theme.spacing(1.25),
    width: theme.spacing(18),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  replay: {
    color: '#ff0000',
    paddingLeft: theme.spacing(1.5),
    width: theme.spacing(18),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));
