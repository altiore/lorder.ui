import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    opacity: 0.5,
  },
  button: {
    marginTop: 20,
  },
  chart: {
    flexGrow: 1,
    maxWidth: 620,
  },
  content: {
    background: '#fff',
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  members: {
    backgroundColor: '#ccc',
    display: 'flex',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '80%',
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
  projectTitle: {
    color: theme.palette.secondary.dark,
  },
  sectionWrap: {
    background: '#fff',
    borderBottom: 0,
    borderTop: 0,
    // paddingBottom: 170,
  },
  title: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
