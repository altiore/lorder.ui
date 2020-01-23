import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';
import { activeUsersCount } from '#/@store/statistics';
import Achievement from './Achievement';

const mapState = createStructuredSelector<IState, { value: number }>({
  value: activeUsersCount,
});

export default connect(mapState)(Achievement);
