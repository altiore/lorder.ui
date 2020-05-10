import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activeUsersCount } from '#/@store/statistics';

import PeopleG, { IPeopleG } from './PeopleG';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, IPeopleG>({
  count: activeUsersCount,
});

export default connect(mapState)(PeopleG);
