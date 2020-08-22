import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { TimeLine } from '@components/time-line';

import { currentRange, shownUserWorkId } from '#/@store/ui';
import { currentTimeDependentOnTimer, filteredEvents, patchUserWork } from '#/@store/user-works';

import { IEvent, IState } from '@types';

interface IMappedProps {
  currentRange: any;
  currentTime: string;
  events: IEvent[];
  userWorkId?: number;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  currentRange,
  currentTime: currentTimeDependentOnTimer,
  events: filteredEvents,
  userWorkId: shownUserWorkId,
});

const mapDispatch = {
  patchUserWork,
};

export default connect(mapStateToProps, mapDispatch)(TimeLine);
