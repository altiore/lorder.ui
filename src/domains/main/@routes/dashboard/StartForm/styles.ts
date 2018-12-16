import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    input: {
      flexGrow: 1,
      marginBottom: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing.unit,
        marginRight: 0,
      },
    },
    inputBlock: {
      alignItems: 'baseline',
      display: 'flex',
      flexFlow: 'row nowrap',
      width: '100%',
    },
    play: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      width: '100%',
    },
    select: {
      width: 150,
    },
  });
