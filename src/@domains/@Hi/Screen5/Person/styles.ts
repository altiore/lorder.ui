import { makeStyles, Theme } from '@material-ui/core/styles';

const IMAGE_SIZE = 180;

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: IMAGE_SIZE,
    margin: theme.spacing(1 / 2),
    width: IMAGE_SIZE,
  },
  avatarWrapper: {
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: '50%',
    marginBottom: theme.spacing(2),
  },
  item: {
    marginBottom: theme.spacing(2),
  },
}));
