import grey from '@material-ui/core/colors/grey';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';

const TAB_HEIGHT = 24;

export const styles = (theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: grey[300],
      borderRadius: theme.shape.borderRadius,
      color: 'gray',
      cursor: 'text',
      height: 300,
      lineHeight: '24px',
      marginLeft: 12,
      marginTop: 20,
      whiteSpace: 'pre-line',
      width: '100%',
    },
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
      backgroundColor: 'transparent',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
    },
    headerTitle: {
      marginLeft: theme.spacing(1.5),
    },
    main: {
      paddingLeft: theme.spacing(1.5),
    },
    mainActive: {
      marginTop: -TAB_HEIGHT - 4,
    },
    markdown: {
      '& img': {
        maxHeight: 420,
        maxWidth: '100%',
      },
      backgroundColor: 'transparent',
      paddingLeft: 1,
    },
    markdownNested: {
      marginTop: 4,
      minHeight: 109,
    },
    root: {
      backgroundColor: 'transparent',
      flexGrow: 1,
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      maxWidth: theme.spacing(91),
      minHeight: theme.spacing(40),
    },
    saveButton: {
      marginTop: theme.spacing(1),
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
