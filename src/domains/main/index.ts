import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { closeDialog, openDialog } from 'store/dialog';
import { MainJsx } from './Main';
import { styles } from './styles';

const mapDispatchToProps = {
  closeDialog,
  openDialog,
  push,
};

export const Main = connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MainJsx));
