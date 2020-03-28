import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { userRole } from '#/@store/identity';

import { AppJsx } from './App';

const mapStateToProps = createStructuredSelector({
  userRole,
});

export default connect(mapStateToProps)(AppJsx);
