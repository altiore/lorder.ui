import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    input: {
      flexGrow: 1,
      marginBottom: theme.spacing.unit,
    },
    inputBlock: {
      alignItems: 'baseline',
      display: 'flex',
      flexFlow: 'row nowrap',
      marginBottom: theme.spacing.unit,
      width: '100%',
    },
    play: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      marginBottom: theme.spacing.unit * 2,
      width: '100%',
    },
    select: {
      width: 150,
    },
  });
