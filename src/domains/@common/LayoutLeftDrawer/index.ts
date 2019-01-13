import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from 'src/store/dialog';
import { userRole } from 'src/store/identity';
import { isLeftBarOpen, toggleUiSetting } from 'src/store/ui';
import { LayoutLeftDrawerTsx } from './LayoutLeftDrawer';
import { styles } from './styles';

const mapState = createStructuredSelector({
  isLeftBarOpen,
  userRole,
});

const mapDispatch = {
  closeDialog,
  goTo: push,
  openDialog,
  toggleUiSetting,
};

export const LayoutLeftDrawer = connect(
  mapState,
  mapDispatch
)(withRouter(withStyles(styles, { withTheme: true })(LayoutLeftDrawerTsx)));
