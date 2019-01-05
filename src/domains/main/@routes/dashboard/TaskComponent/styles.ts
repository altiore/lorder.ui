import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    buttonProject: {
      flexBasis: '16%',
      textTransform: 'none',
      whiteSpace: 'nowrap',
    },
    buttonTitle: {
      flexBasis: '60%',
      textTransform: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'inline-block',
        maxWidth: 146,
      },
    },
    buttonTitleLabel: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    duration: {
      flexBasis: '10%',
    },
    listItem: {
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      flexGrow: 1,
      justifyContent: 'space-between',
      marginBottom: theme.spacing.unit,
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing.unit,
        paddingLeft: 2,
        paddingTop: theme.spacing.unit,
      },
    },
    listItemRoot: {
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    userWorkTable: {
      zIndex: 1202,
    },
  });
