import { makeStyles, Theme } from '@material-ui/core/styles';

const MIN_HEIGHT = 'calc(100vh - 88px)';

export const useStyles = makeStyles((theme: Theme) => ({
  block: {
    alignItems: 'center',
    color: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      minHeight: MIN_HEIGHT,
    },
  },
  button: {
    fontSize: theme.typography.pxToRem(24),
    margin: theme.spacing(2, 0, 3.5),
    padding: theme.spacing(0.625, 3),
  },
  content: {
    backgroundColor: 'rgba(37, 36, 38, 0.6)',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    minHeight: MIN_HEIGHT,
    padding: theme.spacing(2),
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#242426',
    },
  },
  divider: {
    backgroundColor: theme.palette.secondary.dark,
    maxWidth: theme.spacing(32),
    width: '100%',
  },
  motto: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  question: {
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: 300,
    },
  },
  title: {
    color: theme.palette.secondary.dark,
  },
  toggleSpeed: {
    cursor: 'pointer',
  },
}));
