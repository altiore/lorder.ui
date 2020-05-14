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
        width: 193,
        // tslint:disable-next-line:object-literal-sort-keys
        height: 48,
        color: '#ffffff',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        // todo сделать анимацию плавной
        // transition: theme.transitions.create(['all'], { duration: '1s', delay: '0.5s' }),
        '&:after': {
          content: '"Создать новую задачу"',
          display: 'block',
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: 500,
          // transition: theme.transitions.create(['all'], {duration: '1s', delay: '1s'}),
        },
      },
      fontSize: 14,
      fontWeight: 500,
      height: 48,
      width: 48,
      // tslint:disable-next-line:object-literal-sort-keys
      minWidth: 0,
      borderRadius: 24,
      border: 'none',
      backgroundColor: '#f2d578',
      boxShadow: 'none',
      color: 'white',
      '&:after': {
        content: '"+"',
        display: 'block',
        opacity: 1,
      },
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
