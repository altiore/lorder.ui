import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';

import { withResize } from '@hooks/withResize';
import { openDialog } from '@store/dialog';
import { showWarning } from '@store/notifications';
import { selectedProject } from '@store/projects';
import { openTaskModal, startUserWork } from '@store/tasks';
import { HeaderTsx } from './Header';

const mapStateToProps = createStructuredSelector<IState, any>({
  selectedProject,
});

const mapDispatchToProps = {
  openDialog,
  openTaskModal,
  push,
  showWarning,
  startUserWork,
};

export const Header = connect<any, any, {}, any>(
  mapStateToProps,
  mapDispatchToProps
)(withResize(HeaderTsx));
