import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    input: {
      flexGrow: 1,
      marginBottom: theme.spacing(1),
    },
    inputBlock: {
      alignItems: 'baseline',
      display: 'flex',
      flexFlow: 'row nowrap',
      marginBottom: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 0,
      },
    },
    play: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    select: {
      width: 150,
    },
  });
