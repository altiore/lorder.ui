import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
  edit: {
    '& p': {
      marginTop: theme.spacing(1),
    },
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .6)',
    borderBottomLeftRadius: theme.spacing(20),
    borderBottomRightRadius: theme.spacing(20),
    bottom: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    height: theme.spacing(10),
    justifyContent: 'flex-start',
    position: 'absolute',
    width: '100%',
  },
  wrapper: {
    borderRadius: '50%',
    boxSizing: 'content-box',
    height: theme.spacing(20),
    position: 'relative',
    width: theme.spacing(20),
  },
}));
