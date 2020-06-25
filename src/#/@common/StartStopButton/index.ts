import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { LogicStartStopButton } from '@components/StartStopButton/LogicStartStopButton';

import { currentTaskId } from '#/@store/timer';
import { isPaused, pauseWork, stopPausedTask, stopUserWork, tryToStartUserWork } from '#/@store/user-works';

import { IState } from '@types';

const mapStateToProps = createStructuredSelector<IState, any>({
  currentTaskId,
  isPaused,
});

const mapDispatchToProps = {
  onPause: pauseWork,
  onStart: tryToStartUserWork,
  onStop: stopUserWork,
  onStopPaused: stopPausedTask,
  // todo добавить колбэк на вернуть задачу
};

export default connect(mapStateToProps, mapDispatchToProps)(LogicStartStopButton) as any;
