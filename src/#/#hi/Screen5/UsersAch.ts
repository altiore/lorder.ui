import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activeUsersCount } from '#/@store/statistics';

import Achievement from './Achievement';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, { value: number }>({
  value: activeUsersCount,
});

export default connect(mapState)(Achievement);
