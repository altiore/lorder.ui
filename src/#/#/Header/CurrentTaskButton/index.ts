import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentTask } from '#/@store/timer';

import { CurrentTaskBtn } from './CurrentTaskButton';

import { IState, ITask } from '@types';

const mapStateToProps = createStructuredSelector<IState, { currentTask: ITask }>({
  currentTask,
});

export default connect(mapStateToProps)(CurrentTaskBtn);
