import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme): any => ({
  appBar: {
    opacity: 0.5,
  },
  bottomBar: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
  },
  button: {
    marginTop: 20,
  },
  chart: {
    flexGrow: 1,
    maxWidth: 620,
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  overlay: {
    display: 'flex',
    zIndex: 1,
  },
  paper: {
    boxSizing: 'border-box',
    height: 140,
    padding: 10,
    width: 350,
  },
  profile: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    minWidth: 0,
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  title: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
