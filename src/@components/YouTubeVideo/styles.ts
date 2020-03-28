import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: `100vh`,
    overflow: 'hidden',
    position: 'absolute',
  },
  video: {
    '& > div': {
      height: '100%',
      width: '100%',
    },
  },
}));
