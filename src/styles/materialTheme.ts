import amber from '@material-ui/core/colors/amber';
// import green from '@material-ui/core/colors/green';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  mainContent: {
    width: 1012,
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
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
