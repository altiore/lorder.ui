import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: 30,
    width: 30,
  },
  avatarWrapper: {
    borderRadius: '50%',
    position: 'absolute',
    top: -2,
    right: -14.5,
  },
  button: {
    paddingRight: 26,
  },
  taskStatus: {
    position: 'relative',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
}));
