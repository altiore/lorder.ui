import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
  },
  wrapper: {
    padding: theme.spacing(2),
  },
}));
