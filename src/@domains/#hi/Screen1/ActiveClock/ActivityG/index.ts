import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { activityStat } from '@store/statistics';
import { IState } from '@types';
import ActivityG, { IActivityG } from './ActivityG';

const mapState = createStructuredSelector<IState, IActivityG>({
  activity: activityStat,
});

export default connect(mapState)(ActivityG);
