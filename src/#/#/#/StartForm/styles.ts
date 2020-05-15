import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    add: {
      '& svg': {
        fontSize: theme.typography.pxToRem(28),
      },
      '&:after': {
        content: '"+"',
        display: 'block',
        fontSize: theme.typography.pxToRem(28),
        fontWeight: 500,
        overflow: 'hidden',
        transition: theme.transitions.create(['content'], { delay: 1000 }),
      },
      '&:hover': {
        '&:after': {
          content: '"Создать новую задачу"',
          display: 'block',
          fontFamily: 'Roboto',
          fontSize: theme.typography.pxToRem(14),
          fontWeight: 500,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
        backgroundColor: '#f2d578',
        border: 'none',
        boxShadow: '0 4px 10px rgba(242, 213, 120, 0.5)',
        color: '#ffffff',
        cursor: 'pointer',
        height: 48,
        transition: theme.transitions.create(['width']),
        width: 193,
      },
      backgroundColor: '#f2d578',
      border: 'none',
      borderRadius: 24,
      boxShadow: 'none',
      color: 'white',
      height: 48,
      minWidth: 0,
      width: 48,
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
