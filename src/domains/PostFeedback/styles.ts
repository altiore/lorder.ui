import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    content: {},
    email: {
      margin: `${theme.spacing.unit}px ${theme.spacing.unit * 1.5}px`,
      maxWidth: '97%',
    },
    title: {
      paddingLeft: theme.spacing.unit * 4,
    },
  });
