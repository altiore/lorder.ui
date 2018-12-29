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
          width: '100%',
          zIndex: 100,
        },
      },
    },
    MuiDialogTitle: {
      root: {
        alignItems: 'center',
        [defaultTheme.breakpoints.up('sm')]: {
          display: 'none',
        },
        backgroundColor: '#24292E',
        display: 'flex',
        flexFlow: 'row nowrap',
        height: 60,
        justifyContent: 'space-between',
        padding: '0 20px',
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
    primary: {
      contrastText: '#ffffff',
      dark: '#24292E',
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
