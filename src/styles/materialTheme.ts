import amber from '@material-ui/core/colors/amber';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  mainContent: {
    width: 1012,
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
