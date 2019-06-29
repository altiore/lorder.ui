import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    item: {
      backgroundColor: theme.palette.primary.light,
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
    },
    row: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row nowrap',
    },
  });
