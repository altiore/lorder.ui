import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1,
      margin: `-${theme.spacing(3)}px ${theme.spacing(1)}px 0`,
    },
  });
