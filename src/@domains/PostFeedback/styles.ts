import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    content: {
      backgroundColor: theme.palette.background.default,
    },
    email: {
      margin: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
      maxWidth: '97%',
    },
    title: {
      paddingLeft: theme.spacing(1) * 4,
    },
  });
