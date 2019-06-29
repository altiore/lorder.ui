import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderColor: theme.palette.primary.dark,
      borderRadius: 4,
      borderStyle: 'solid',
      borderWidth: 1,
      marginBottom: -3,
      minWidth: 80,
      textAlign: 'center',
    },
    select: {
      color: theme.palette.grey['50'],
      fontSize: 12,
      padding: 0,
    },
  });
