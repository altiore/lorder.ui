import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { TimeLine } from '@components/time-line';

import { currentRange } from '#/@store/ui';
import { currentTimeDependentOnTimer, filteredEvents, patchUserWork } from '#/@store/user-works';

import { IEvent, IState } from '@types';

interface IMappedProps {
  currentRange: any;
  currentTime: string;
  events: IEvent[];
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  currentRange,
  currentTime: currentTimeDependentOnTimer,
  events: filteredEvents,
});

const mapDispatch = {
  patchUserWork,
};

export default connect(mapStateToProps, mapDispatch)(TimeLine);
