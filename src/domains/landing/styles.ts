import { Theme } from '@material-ui/core/styles';
import cloudsImage from './clouds.png';

export const styles = (theme: Theme): any => ({
  '@keyframes move-clouds-back': {
    from: {
      backgroundPosition: 0,
    },
    to: {
      backgroundPosition: '10000px 0',
    },
  },
  appBar: {
    opacity: 0.5,
  },
  bottomBar: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    height: 80,
    justifyContent: 'center',
    paddingLeft: 80,
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
  clouds: {
    animation: 'move-clouds-back 200s linear infinite',
    background: `transparent url(${cloudsImage}) repeat-x center center`,
    display: 'block',
    height: '90%',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.sharp,
    }),
    width: '100%',
    zIndex: 3,
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    padding: 15,
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
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
