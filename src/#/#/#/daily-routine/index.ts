import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentTask } from '#/@store/timer';
import { totalTimeSpentToday } from '#/@store/user-works';

import DailyRoutineMain from './daily-routine-main';

import { IState, ITask } from '@types';

interface IMappedProps {
  currentTask: ITask;
  hoursWorkedToday: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  currentTask,
  hoursWorkedToday: totalTimeSpentToday,
});

export default connect(mapStateToProps)(DailyRoutineMain);
