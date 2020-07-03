import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentTaskId } from '#/@store/timer';
import { isPaused, pauseWork, stopPausedTask, stopUserWork, tryToStartUserWork } from '#/@store/user-works';

import { StartStopBtnTsx } from './start-stop-btn';

import { IState, ITask } from '@types';

interface ITaskDurationOwn {
  afterStop?: any;
  onStartNew?: any;
  task?: ITask;
}

const mapStateToProps = createStructuredSelector<IState, any>({
  currentTaskId,
  isPaused,
});

const mapDispatchToProps = {
  onComplete: stopUserWork,
  onCompletePaused: stopPausedTask,
  onPause: pauseWork,
  onStart: tryToStartUserWork,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartStopBtnTsx as any) as (
  props: ITaskDurationOwn
) => JSX.Element;
