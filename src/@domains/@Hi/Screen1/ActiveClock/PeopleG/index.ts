import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { infoPeople } from '@store/info';
import { IState } from '@types';
import PeopleG, { IPeopleG } from './PeopleG';

const mapState = createStructuredSelector<IState, IPeopleG>({
  count: infoPeople,
});

export default connect(mapState)(PeopleG);
