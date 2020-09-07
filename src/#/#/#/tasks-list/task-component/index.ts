import { connect } from 'react-redux';

import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

import { defaultProjectId } from '#/@store/identity';
import { getTaskById } from '#/@store/tasks';
import { goToProjectWithAsk, isPaused, isRelax } from '#/@store/user-works';

import { TaskComponentTsx } from './task-component';

import { IState } from '@types';

interface IMappedProps {
  defaultProjectId?: number;
  getTaskById: any;
  isPaused: boolean;
  isRelax: boolean;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  defaultProjectId,
  getTaskById,
  isPaused,
  isRelax,
});

const mapDispatch = {
  goToProjectWithAsk,
  push,
};

export default connect(mapStateToProps, mapDispatch)(TaskComponentTsx);
