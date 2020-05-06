import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
    },
    divider: {
      height: theme.spacing(2),
    },
    inputError: {
      marginTop: -14,
      position: 'absolute',
    },
    overlay: {
      backgroundColor: theme.palette.primary.dark,
      height: '100%',
      left: 0,
      opacity: 0.6,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 1300,
    },
    popperPaper: {
      ...theme.mainContent.scroll,
      border: `2px solid ${theme.palette.primary.main}`,
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[5],
      boxSizing: 'border-box',
      marginTop: -2,
      maxHeight: 536,
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
      marginTop: theme.spacing(1),
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
