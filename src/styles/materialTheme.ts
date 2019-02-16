import amber from '@material-ui/core/colors/amber';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

const defaultTheme: Theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const prettyScroll1 = {
  '&::-webkit-scrollbar': {
    width: defaultTheme.spacing.unit,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#B5BEC5',
    borderRadius: defaultTheme.spacing.unit / 2,
    cursor: 'pointer',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: defaultTheme.palette.text.hint,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#CED4D9',
    borderRadius: defaultTheme.spacing.unit / 2,
  },
};

export default createMuiTheme({
  mainContent: {
    scroll: prettyScroll1,
    width: 1012,
  },
  overrides: {
    MuiDialogActions: {
      root: {
        [defaultTheme.breakpoints.down('sm')]: {
          bottom: 0,
          margin: 0,
          padding: '4px',
          position: 'fixed',
          width: 'calc(100% - 8px)',
          zIndex: 100,
        },
      },
    },
    MuiDialogContent: {
      root: prettyScroll1,
    },
    MuiDialogTitle: {
      root: {
        alignItems: 'center',
        // backgroundColor: '#24292E',
        borderRadius: defaultTheme.spacing.unit / 2,
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
      dark: '#FFB200',
      light: amber[50],
      main: '#FFF0B5',
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
      scroll: object;
      width: number;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    mainContent?: {
      scroll?: object;
      width?: number;
    };
  }
}
