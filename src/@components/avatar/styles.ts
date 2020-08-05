import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: 0,
    },
    avatarBorder: {
      '&:last-child': {
        marginRight: theme.spacing(1),
      },
      border: `2px solid transparent`,
      borderRadius: '50%',
      display: 'inline-flex',
      marginLeft: -theme.spacing(1.5),
      pointerEvents: 'none',
      zIndex: 1,
    },
    avatarBorderSmall: {
      '& > button': {
        margin: 0,
      },
      '&:last-child': {
        marginRight: 0,
      },
      border: 'none',
      marginLeft: 0,
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
  })
);
