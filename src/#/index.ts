import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userRole } from '#/@store/identity';
import { getUserWorks } from '#/@store/user-works';

import { AppJsx } from './App';

import { IState, ROLE } from '@types';

const mapStateToProps = createStructuredSelector<IState, { userRole: ROLE }>({
  userRole,
});

const mapDispatchToProps = {
  getUserWorks,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppJsx);
