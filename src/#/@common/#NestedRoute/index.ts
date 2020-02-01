import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isAuth } from '#/@store/identity';
import { asyncReducersList } from '#/@store/asyncReducers';

import { NestedRoute } from './NestedRoute';

const mapState = createStructuredSelector({
  isAuth,
  asyncReducersList,
} as any);

const mapDispatch = {
  // loadDomainIntl,
};

export default connect(
  mapState,
  mapDispatch
)(NestedRoute);
