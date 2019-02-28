import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    col: {
      alignItems: 'flex-start',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
    },
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      flexFlow: 'row nowrap',
      minHeight: 300,
      minWidth: 500,
      padding: theme.spacing.unit * 2,
    },
    rowSpaceBetween: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    time: {
      zIndex: 4000,
    },
  });
