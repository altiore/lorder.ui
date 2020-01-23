import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { withResize } from '@hooks/withResize';
import { closeDialog, openDialog } from '#/@store/dialog';
import { userRole } from '#/@store/identity';
import { openedProject } from '#/@store/projects';
import { isLeftBarOpen, toggleUiSetting } from '#/@store/ui';
import { LayoutLeftDrawerTsx } from './LayoutLeftDrawer';

const mapState = createStructuredSelector({
  isLeftBarOpen,
  openedProject,
  userRole,
} as any);

const mapDispatch = {
  closeDialog,
  goTo: push,
  openDialog,
  toggleUiSetting,
};

export const LayoutLeftDrawer = connect<any, any, any>(
  mapState,
  mapDispatch
)(withRouter(withResize(LayoutLeftDrawerTsx)));
