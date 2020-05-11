import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    add: {
      '& svg': {
        fontSize: theme.typography.pxToRem(28),
      },
      '&:hover': {
        backgroundColor: '#f2d578',
        boxShadow: '0 4px 10px rgba(242, 213, 120, 0.5)',
      },
      backgroundColor: '#f2d578',
      boxShadow: 'none',
      color: 'white',
    },
    form: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
      width: '100%',
    },
  });
