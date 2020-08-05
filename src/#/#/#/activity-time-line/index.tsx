import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { TimeLine } from '@components/time-line';

import { events } from '#/@store/tasks';
import { patchUserWork } from '#/@store/user-works';

import { IEvent, IState } from '@types';

const mapStateToProps = createStructuredSelector<IState, { events: IEvent[] }>({
  events,
});

const mapDispatch = {
  patchUserWork,
};

export const ActivityTimeline = connect(mapStateToProps, mapDispatch)(TimeLine) as any;
