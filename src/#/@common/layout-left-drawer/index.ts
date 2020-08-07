import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { openedProject } from '#/@store/projects';
import { isTasksLoading, refreshProjectTasks } from '#/@store/tasks';
import { isLeftBarOpen, toggleUiSetting } from '#/@store/ui';

import { LayoutLeftDrawerTsx } from './layout-left-drawer';

import { withResize } from '@hooks/with-resize';

const mapState = createStructuredSelector({
  isLeftBarOpen,
  isTasksLoading,
  openedProject,
} as any);

const mapDispatch = {
  closeDialog,
  goTo: push,
  openDialog,
  refreshProjectTasks,
  toggleUiSetting,
};

export const LayoutLeftDrawer = connect<any, any, any>(
  mapState,
  mapDispatch
)(withRouter(withResize(LayoutLeftDrawerTsx)));
