import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { closeDialog, openDialog } from '#/@store/dialog';
import { userRole } from '#/@store/identity';
import { prevLocation } from '#/@store/router';
import { getAllTasks } from '#/@store/tasks';

import { MainJsx } from './Main';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, any>({
  prevLocation,
  userRole,
});

const mapDispatchToProps = {
  closeDialog,
  getAllTasks,
  openDialog,
  push,
};

export default connect(mapState, mapDispatchToProps)(MainJsx);
