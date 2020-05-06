import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { StartStopBtn } from '@components/StartStopBtn';

import { currentTaskId } from '#/@store/timer';
import { currentUserWork, pauseWork, startUserWork, stopUserWork } from '#/@store/user-works';

import { ITask } from '@types';

interface ITaskDurationOwn {
  afterStop?: any;
  task?: ITask;
}

const mapStateToProps = createStructuredSelector({
  currentTaskId,
  currentUserWork,
} as any);

const mapDispatchToProps = {
  onPause: pauseWork,
  onStart: startUserWork,
  onStop: stopUserWork,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartStopBtn) as (props: ITaskDurationOwn) => JSX.Element;
