import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
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
