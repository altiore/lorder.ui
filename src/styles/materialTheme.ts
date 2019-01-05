import amber from '@material-ui/core/colors/amber';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

const defaultTheme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

export default createMuiTheme({
  mainContent: {
    width: 1012,
  },
  overrides: {
    MuiDialogActions: {
      root: {
        [defaultTheme.breakpoints.down('sm')]: {
          bottom: 0,
          margin: 0,
          padding: '4px 0',
          position: 'fixed',
          right: 6,
          width: '100%',
          zIndex: 100,
        },
      },
    },
    MuiDialogTitle: {
      root: {
        alignItems: 'center',
        backgroundColor: '#24292E',
        display: 'flex',
        flexFlow: 'row nowrap',
        height: 60,
        justifyContent: 'flex-end',
        padding: '0 20px',
        [defaultTheme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: 6,
        paddingRight: 6,
      },
      root: {
        zIndex: defaultTheme.zIndex.drawer + 1,
        [defaultTheme.breakpoints.down('sm')]: {
          ...(defaultTheme.overrides as any).MuiAppBar,
          padding: 0,
        },
      },
    },
  },
  palette: {
    background: {
      default: '#EBEEF0',
    },
    primary: {
      contrastText: '#ffffff',
      dark: '#000000',
      light: '#404448',
      main: '#24292E',
    },
    secondary: {
      contrastText: '#24292E',
      dark: amber[500],
      light: amber[50],
      main: amber[100],
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    h2: {
      fontSize: 14,
      fontWeight: 700,
    },
    h5: {
      fontSize: 18,
      fontWeight: 500,
    },
    useNextVariants: true,
  },
});

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    mainContent: {
      width: number;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    mainContent?: {
      width?: number;
    };
  }
}
