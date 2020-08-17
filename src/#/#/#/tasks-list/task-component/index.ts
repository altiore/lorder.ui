import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { getTaskById } from '#/@store/tasks';
import { goToProjectWithAsk, isPaused } from '#/@store/user-works';

import { TaskComponentTsx } from './task-component';

import { IState } from '@types';

interface IMappedProps {
  getTaskById: any;
  isPaused: boolean;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  getTaskById,
  isPaused,
});

const mapDispatch = {
  goToProjectWithAsk,
  push,
};

export default connect(mapStateToProps, mapDispatch)(TaskComponentTsx);
