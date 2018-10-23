import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    form: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.background.default}`,
    },
  });
