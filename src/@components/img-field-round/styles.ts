import { makeStyles, Theme } from '@material-ui/core/styles';

const SIZE = 14;

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: theme.spacing(SIZE),
    width: theme.spacing(SIZE),
  },
  edit: {
    '& p': {
      marginTop: theme.spacing(1),
    },
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .6)',
    borderBottomLeftRadius: theme.spacing(SIZE),
    borderBottomRightRadius: theme.spacing(SIZE),
    bottom: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    height: theme.spacing(SIZE / 2),
    justifyContent: 'flex-start',
    position: 'absolute',
    width: '100%',
  },
  wrapper: {
    border: '3px solid white',
    borderRadius: '50%',
    boxSizing: 'content-box',
    height: theme.spacing(SIZE),
    position: 'relative',
    width: theme.spacing(SIZE),
  },
}));
