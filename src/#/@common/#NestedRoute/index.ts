import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isAuth } from '#/@store/identity';
import { isReducerExists } from '#/@store/isReducerExists';

import { NestedRoute } from './NestedRoute';

const mapState = createStructuredSelector({
  isAuth,
  isReducerExists,
} as any);

const mapDispatch = {
  // loadDomainIntl,
};

export default connect(
  mapState,
  mapDispatch
)(NestedRoute);
