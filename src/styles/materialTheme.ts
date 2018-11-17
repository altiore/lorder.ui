import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  mainContent: {
    width: 1012,
  },
  palette: {
    primary: teal,
    secondary: amber,
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
