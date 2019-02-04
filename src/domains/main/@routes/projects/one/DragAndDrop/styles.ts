import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) =>
  createStyles({
    column: {
      alignItems: 'center',
      backgroundColor: '#dfe3e6',
      borderRadius: 3,
      display: 'flex',
      flexFlow: 'column nowrap',
      padding: '0 4px 0 0',
    },
    columnContent: {
      ...theme.mainContent.scroll,
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: `0 4px 2px 8px`,
    },
    columnFooter: {
      borderRadius: theme.spacing.unit / 2,
      height: 40,
      width: '100%',
    },
    columnTitle: {
      borderTopLeftRadius: theme.spacing.unit / 2,
      borderTopRightRadius: theme.spacing.unit / 2,
      height: 40,
      lineHeight: '40px',
      marginBottom: theme.spacing.unit / 2,
      padding: `0 ${theme.spacing.unit}px`,
      position: 'relative',
      width: '100%',
    },
    placeholderCard: {
      alignItems: 'center',
      borderRadius: theme.spacing.unit / 2,
      boxShadow: theme.shadows[1],
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      margin: `0 0 ${theme.spacing.unit}px 0`,
      minHeight: 60,
      padding: '6px 4px 6px 8px',
      position: 'relative',
      userSelect: 'none',
    },
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'space-around',
    },
    toggle: {
      position: 'absolute',
      right: 0,
    },
  });
