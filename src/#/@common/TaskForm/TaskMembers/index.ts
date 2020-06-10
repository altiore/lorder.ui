import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { getTaskUsersByTaskId } from '#/@store/tasks';

import { TaskMembersTsx } from './TaskMembers';

import { IState, IUserTask } from '@types';

const mapState = createStructuredSelector<IState, { getTaskUsersByTaskId: (n: number) => IUserTask[] }>({
  getTaskUsersByTaskId,
});

export default connect(mapState)(TaskMembersTsx);
