import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  background: {
    background: `url(${process.env.PUBLIC_URL}/puzzle.svg)`,
    // filter: 'blur(5px)',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  background2: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  main: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    height: 'calc(100vh - 56px)',
    zIndex: 0,
  },
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flexGrow: 1,
    minHeight: '100%',
    position: 'relative',
  },
  scrollBody: {
    overflowY: 'hidden',
  },
}));
