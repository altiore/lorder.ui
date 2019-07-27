import { makeStyles, Theme } from '@material-ui/core/styles';

const IMAGE_SIZE = 180;

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: IMAGE_SIZE,
    margin: theme.spacing(1 / 2),
    width: IMAGE_SIZE,
  },
  avatarWrapper: {
    alignItems: 'center',
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: '50%',
    display: 'flex',
    heigth: theme.spacing(23.5),
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    width: theme.spacing(23.5),
  },
  item: {
    marginBottom: theme.spacing(2),
    maxWidth: theme.spacing(27.5),
  },
}));
