import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginLeft: 4,
      minHeight: 42,
      minWidth: 140,
      padding: `0 0 0 ${theme.spacing.unit * 2}px`,
      position: 'relative',
      textTransform: 'none',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 160,
      },
    },
    inProgress: {
      backgroundImage:
        'linear-gradient(to right, #daff3f, #c2ff38 12%, #8eff29 41%, #68ff1e 67%, #51ff17 87%, #49ff15)',
      borderRadius: 6,
      height: 6,
      position: 'absolute',
      right: 9,
      top: 9,
      width: 6,
    },
    openInNew: {
      marginLeft: theme.spacing.unit,
      // marginRight: -theme.spacing.unit * 3,
    },
    projectPopover: {
      zIndex: 1202,
    },
    text: {
      color: theme.palette.secondary.light,
    },
  });
