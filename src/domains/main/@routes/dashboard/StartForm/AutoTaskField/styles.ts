import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
    inputError: {
      marginTop: -14,
      position: 'absolute',
    },
    popper: {
      ...theme.mainContent.scroll,
      marginLeft: theme.spacing.unit * 2,
      maxHeight: 534,
      overflowY: 'auto',
      [theme.breakpoints.down('sm')]: {
        maxHeight: 200,
      },
    },
    root: {
      flexGrow: 1,
      width: '100%',
    },
    suggestion: {
      display: 'block',
    },
    suggestionsContainerOpen: {
      left: 0,
      marginTop: theme.spacing.unit,
      position: 'absolute',
      right: 0,
      zIndex: 1,
    },
    suggestionsList: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  });
