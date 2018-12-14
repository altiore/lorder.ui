import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    button: {
      marginLeft: 4,
      minWidth: 140,
      textTransform: 'none',
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
    projectPopover: {
      zIndex: 1202,
    },
    text: {
      color: theme.palette.secondary.light,
    },
  });
