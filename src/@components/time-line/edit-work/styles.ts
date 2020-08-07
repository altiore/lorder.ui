import { makeStyles, Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeIcon: {
      cursor: 'pointer',
      position: 'absolute',
      right: 5,
      top: 10,
    },
    col: {
      alignItems: 'flex-start',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      margin: '10px 0',
    },
    fieldTitle: {
      display: 'inline-block',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    grow: {
      flexGrow: 1,
    },
    noMargin: {
      margin: 0,
    },
    noMarginBottom: {
      marginBottom: 0,
    },
    root: {
      alignItems: 'stretch',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      minWidth: theme.spacing(66),
      padding: theme.spacing(2),
      position: 'relative',
      width: theme.spacing(66),
    },
    rowSpaceBetween: {
      alignItems: 'center',
      display: 'flex',
      flexBasis: 50,
      justifyContent: 'space-between',
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    workedHoursToday: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 0,
    },
  })
);
