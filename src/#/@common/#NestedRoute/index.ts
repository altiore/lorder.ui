import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { asyncReducersList } from '#/@store/asyncReducers';
import { isAuth } from '#/@store/identity';

import { NestedRoute } from './NestedRoute';

const mapState = createStructuredSelector({
  asyncReducersList,
  isAuth,
} as any);

const mapDispatch = {
  // loadDomainIntl,
};

export default connect(
  mapState,
  mapDispatch
)(NestedRoute);
