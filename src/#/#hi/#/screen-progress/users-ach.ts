import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activeUsersCount } from '#/@store/statistics';

import Achievement from './achievement';

import { IState } from '@types';

interface IMapped {
  value: number;
}

const mapState = createStructuredSelector<IState, IMapped>({
  value: activeUsersCount,
});

export default connect(mapState)(Achievement);
