import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: 4,
    minHeight: 42,
    minWidth: 140,
    padding: theme.spacing(0, 0, 0, 2),
    position: 'relative',
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      '& button': {
        display: 'none',
      },
      marginLeft: 0,
      maxWidth: 158,
      padding: 0,
    },
  },
  inProgress: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.error.dark}, ${theme.palette.error.dark} 12%, ${theme.palette.error.dark} 41%, ${theme.palette.error.dark} 67%, ${theme.palette.error.dark} 87%, ${theme.palette.error.dark})`,
    borderRadius: 6,
    height: 6,
    position: 'absolute',
    right: 9,
    top: 9,
    width: 6,
  },
  inProgressGreen: {
    backgroundImage: 'linear-gradient(to right, #daff3f, #c2ff38 12%, #8eff29 41%, #68ff1e 67%, #51ff17 87%, #49ff15)',
  },
  openInNew: {
    marginLeft: theme.spacing(1),
  },
  projectPopover: {
    zIndex: 1202,
  },
  text: {
    color: theme.palette.secondary.light,
  },
}));
