import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { team } from '@domains/@Hi/data';
import Screen5 from './Screen5';

const getTeam = () => team;

const mapState = createStructuredSelector({
  team: getTeam,
});

export default connect(mapState)(Screen5);
