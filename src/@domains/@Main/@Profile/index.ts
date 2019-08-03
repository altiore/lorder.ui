import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';
import { Profile } from './Profile';

const mapState = createStructuredSelector<IState, any>({});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch
)(Profile);
