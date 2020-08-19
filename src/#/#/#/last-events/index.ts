import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { filteredEvents } from '#/@store/user-works';

import { LastEventsTsx } from './last-events';

import { IEvent, IState } from '@types';

interface IMappedProms {
  events: IEvent[];
}

const mapState = createStructuredSelector<IState, IMappedProms>({
  events: filteredEvents,
});

export const LastEvents = connect(mapState)(LastEventsTsx);
