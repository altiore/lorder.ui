import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userRole } from '#/@store/identity';

import { AppJsx } from './app';

import { IState, ROLE } from '@types';

const mapStateToProps = createStructuredSelector<IState, { userRole: ROLE }>({
  userRole,
});

export default connect(mapStateToProps)(AppJsx);
