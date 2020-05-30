import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

const ADD_BTN_SIZE = 56;

export const styles = (theme: Theme) =>
  createStyles({
    add: {
      '& svg': {
        fontSize: theme.typography.pxToRem(28),
      },
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: ADD_BTN_SIZE / 2.1,
        boxShadow: theme.shadow.secondary,
        color: theme.palette.background.paper,
        cursor: 'pointer',
        padding: theme.spacing(0, 2),
        width: theme.spacing(25),
      },
      backgroundColor: '#f2d578',
      borderRadius: ADD_BTN_SIZE / 2,
      boxShadow: 'none',
      color: theme.palette.background.paper,
      fontFamily: 'Roboto',
      fontSize: theme.typography.pxToRem(14),
      fontWeight: 500,
      height: ADD_BTN_SIZE,
      overflow: 'hidden',
      transition: theme.transitions.create(['color', 'width'], {
        duration: theme.transitions.duration.shortest,
      }),
      whiteSpace: 'nowrap',
      width: ADD_BTN_SIZE,
    },
    form: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      marginBottom: theme.spacing(0.5),
      marginTop: theme.spacing(-2),
      width: '100%',
    },
  });
