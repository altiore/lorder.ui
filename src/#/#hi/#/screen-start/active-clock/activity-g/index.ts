import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activityStat } from '#/@store/statistics';

import ActivityG, { IActivityG } from './activity-g';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, IActivityG>({
  activity: activityStat,
});

export default connect(mapState)(ActivityG);
