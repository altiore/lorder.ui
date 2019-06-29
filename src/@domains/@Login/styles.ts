import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  login: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
}));
