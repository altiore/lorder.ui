import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    row: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
    },
  });
