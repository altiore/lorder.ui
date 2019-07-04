import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    // overflow: 'hidden',
    position: 'absolute',
    weight: '100%',
  },
  video: {
    '& > div': {
      height: '100%',
      width: '100%',
    },
    backgroundColor: 'red',
    textAlign: 'center',
  },
  videoWrapper: {
    position: 'absolute',
  },
});
