import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { activeUsersCount } from '@store/statistics';
import { IState } from '@types';
import PeopleG, { IPeopleG } from './PeopleG';

const mapState = createStructuredSelector<IState, IPeopleG>({
  count: activeUsersCount,
});

export default connect(mapState)(PeopleG);
