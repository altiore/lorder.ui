import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  loading: {
    alignItems: 'center',
    backgroundColor: theme.palette.default.main,
    display: 'flex',
    flexGrow: 1,
    height: '100vh',
    justifyContent: 'center',
  },
}));
