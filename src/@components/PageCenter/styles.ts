import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      margin: `${theme.spacing(3)}px auto`,
      maxWidth: theme.mainContent.width,
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        margin: 0,
        padding: theme.spacing(1),
      },
      [theme.breakpoints.up('lg')]: {
        width: theme.mainContent.width,
      },
    },
  });
