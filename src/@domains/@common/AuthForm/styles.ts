import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  empty: {
    height: 240,
  },
  form: {
    alignItems: 'center',
    backgroundColor: 'inherit',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    width: 'fit-content',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    marginBottom: theme.spacing(2),
    width: theme.spacing(40),
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 64px)',
    },
  },
  toggleButton: {
    width: '100%',
  },
}));
