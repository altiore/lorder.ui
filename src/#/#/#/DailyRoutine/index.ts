import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { TimeLine } from '@components/TimeLine';

import { events } from '#/@store/tasks';
import { patchUserWork } from '#/@store/user-works';

const mapStateToProps = createStructuredSelector({
  events,
} as any);

const mapDispatch = {
  patchUserWork,
};

export const DailyRoutine = connect(mapStateToProps, mapDispatch)(TimeLine);
