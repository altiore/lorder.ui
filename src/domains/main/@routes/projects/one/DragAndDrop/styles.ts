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
      height: 30,
      lineHeight: '30px',
      marginBottom: theme.spacing.unit / 2,
      paddingLeft: theme.spacing.unit / 2,
    },
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'space-around',
    },
  });
