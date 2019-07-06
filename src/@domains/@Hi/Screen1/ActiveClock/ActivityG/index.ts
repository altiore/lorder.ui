import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { infoActivity } from '@store/info';
import { IState } from '@types';
import ActivityG, { IActivityG } from './ActivityG';

const mapState = createStructuredSelector<IState, IActivityG>({
  activity: infoActivity,
});

export default connect(mapState)(ActivityG);
