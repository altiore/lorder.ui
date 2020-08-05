import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userRole } from '#/@store/identity';

import { AppJsx } from './app';

import { IState, ROLE } from '@types';

interface IMappedProps {
  userRole: ROLE;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  userRole,
});

export default connect(mapStateToProps)(AppJsx);
