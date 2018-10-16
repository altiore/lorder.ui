import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: green,
    secondary: amber,
  },
  typography: {
    useNextVariants: true,
  },
});
