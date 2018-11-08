import amber from '@material-ui/core/colors/amber';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
  },
  typography: {
    useNextVariants: true,
  },
});

// OLD one
// export default createMuiTheme({
//   palette: {
//     primary: green,
//     secondary: amber,
//   },
//   typography: {
//     useNextVariants: true,
//   },
// });
