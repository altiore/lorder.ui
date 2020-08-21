import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { openDialog } from '#/@store/dialog';
import { getStrategyByProjectId } from '#/@store/projects';
import { currentTask } from '#/@store/timer';
import { isPaused, pauseWork, stopPausedTask, stopUserWork, tryToStartUserWork } from '#/@store/user-works';

import { StartStopBtnTsx } from './start-stop-btn';

import { IProjectStrategyInfo, IState, ITask } from '@types';

interface IMappedProps {
  currentTask: ITask;
  getStrategyByProjectId: (prId: number) => IProjectStrategyInfo | undefined;
  isPaused: boolean;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  currentTask,
  getStrategyByProjectId,
  isPaused,
});

const mapDispatchToProps = {
  onComplete: stopUserWork,
  onCompletePaused: stopPausedTask,
  onPause: pauseWork,
  onStart: tryToStartUserWork,
  openDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartStopBtnTsx);
