import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    column: {
      backgroundColor: '#dfe3e6',
      borderRadius: 3,
    },
    columnTitle: {
      height: 30,
      lineHeight: '30px',
      marginBottom: theme.spacing.unit / 2,
      paddingLeft: theme.spacing.unit / 2,
    },
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'space-around',
    },
  });
