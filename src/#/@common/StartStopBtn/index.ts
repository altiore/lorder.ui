import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { StartStopBtn } from '@components/StartStopBtn';

import { currentTaskId } from '#/@store/timer';
import { isPaused, pauseWork, startUserWork, stopPausedTask, stopUserWork } from '#/@store/user-works';

import { ITask } from '@types';

interface ITaskDurationOwn {
  afterStop?: any;
  onStartNew?: any;
  task?: ITask;
}

const mapStateToProps = createStructuredSelector({
  currentTaskId,
  isPaused,
} as any);

const mapDispatchToProps = {
  onPause: pauseWork,
  onStart: startUserWork,
  onStop: stopUserWork,
  onStopPaused: stopPausedTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartStopBtn) as (props: ITaskDurationOwn) => JSX.Element;
