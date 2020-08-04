import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { destroy } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { openDialog } from '#/@store/dialog';
import { userRole } from '#/@store/identity';
import { prevLocation } from '#/@store/router';
import { getAllTasks } from '#/@store/tasks';

import { MainJsx } from './main';

import { IState, ROLE } from '@types';

interface IMappedProps {
  prevLocation: any;
  userRole: ROLE;
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  prevLocation,
  userRole,
});

const mapDispatchToProps = {
  destroy,
  getAllTasks,
  openDialog,
  push,
};

export default connect(mapState, mapDispatchToProps)(MainJsx);
