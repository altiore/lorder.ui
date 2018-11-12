import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    buttonProject: {
      flexBasis: '16%',
      textTransform: 'none',
    },
    buttonTitle: {
      flexBasis: '60%',
      textTransform: 'none',
    },
    duration: {
      flexBasis: '10%',
    },
    listItem: {
      border: `1px solid ${theme.palette.grey['300']}`,
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1,
      justifyContent: 'space-between',
      marginBottom: theme.spacing.unit,
    },
  });
