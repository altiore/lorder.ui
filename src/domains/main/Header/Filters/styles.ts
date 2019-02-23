import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      margin: 2,
    },
    avatarBorder: {
      border: `2px solid transparent`,
      borderRadius: '50%',
      margin: 4,
    },
    avatarSelected: {
      border: `2px solid ${theme.palette.secondary.dark}`,
    },
    avatarWrapper: {
      '&:last-child': {
        marginRight: theme.spacing.unit,
      },
      backgroundColor: 'transparent',
      borderRadius: '50%',
    },
    divider: {
      height: 28,
      margin: 4,
      width: 1,
    },
    iconButton: {
      padding: 10,
    },
    input: {
      flex: 1,
      marginLeft: 8,
    },
    members: {
      alignItems: 'space-between',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    search: {
      alignItems: 'center',
      display: 'flex',
      padding: '2px 4px',
      width: 400,
    },
  });
