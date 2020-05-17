import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  login: {
    alignItems: 'center',
    backgroundColor: theme.palette.default.main,
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      paddingTop: theme.spacing(2),
    },
  },
}));
