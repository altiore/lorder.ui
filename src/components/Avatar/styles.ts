import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: 0,
    },
    avatarBorder: {
      '&:last-child': {
        marginRight: theme.spacing.unit,
      },
      border: `2px solid transparent`,
      borderRadius: '50%',
      display: 'inline-flex',
      marginLeft: -theme.spacing.unit * 1.5,
      pointerEvents: 'none',
      zIndex: 1,
    },
    avatarSelected: {
      border: `2px solid ${theme.palette.secondary.dark}`,
      cursor: 'pointer',
      pointerEvents: 'auto',
    },
    avatarSmall: {
      fontSize: 14,
      height: 28,
      width: 28,
    },
    avatarWrapper: {
      borderRadius: '50%',
      margin: 2,
      pointerEvents: 'auto',
    },
  });
