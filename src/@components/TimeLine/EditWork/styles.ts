import { makeStyles, Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    col: {
      alignItems: 'flex-start',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
    },
    end: {
      alignItems: 'flex-end',
    },
    grow: {
      flexGrow: 1,
    },
    root: {
      alignItems: 'stretch',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      minWidth: theme.spacing(66),
      padding: theme.spacing(2),
      width: theme.spacing(66),
    },
    rowSpaceBetween: {
      alignItems: 'flex-end',
      display: 'flex',
      flexBasis: 50,
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);
