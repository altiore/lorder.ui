import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { userRole } from '#/@store/identity';
import { selectProject } from '#/@store/project';
import { openedProject } from '#/@store/projects';
import { isLeftBarOpen, toggleUiSetting } from '#/@store/ui';

import { LayoutLeftDrawerTsx } from './LayoutLeftDrawer';

import { withResize } from '@hooks/withResize';

const mapState = createStructuredSelector({
  isLeftBarOpen,
  openedProject,
  selectProject,
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
