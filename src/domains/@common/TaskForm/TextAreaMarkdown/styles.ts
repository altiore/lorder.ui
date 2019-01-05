import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

const TAB_HEIGHT = 24;

export const styles = (theme: Theme) =>
  createStyles({
    content: {
      display: 'flex',
      flexFlow: 'column nowrap',
      minHeight: 108,
    },
    editor: {
      borderRadius: 2,
      flexGrow: 1,
      marginLeft: -2,
      marginTop: 17,
    },
    header: {
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
    },
    headerTitle: {
      marginLeft: theme.spacing.unit * 1.5,
    },
    main: {
      paddingLeft: theme.spacing.unit * 4,
    },
    mainActive: {
      marginTop: -TAB_HEIGHT - 4,
    },
    markdown: {
      backgroundColor: theme.palette.background.default,
      paddingLeft: 1,
    },
    markdownNested: {
      marginTop: 4,
      minHeight: 109,
    },
    root: {
      backgroundColor: theme.palette.background.default,
      flexGrow: 1,
      marginBottom: theme.spacing.unit,
    },
    saveButton: {
      marginTop: theme.spacing.unit,
      maxWidth: 144,
    },
    tabRoot: {
      minHeight: TAB_HEIGHT,
      minWidth: 50,
    },
    tabsFlexContainer: {
      justifyContent: 'flex-end',
    },
    tabsIndicator: {
      backgroundColor: theme.palette.primary.dark,
    },
    tabsRoot: {
      minHeight: TAB_HEIGHT,
    },
  });
