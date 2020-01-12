import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { resetGlobalCache } from '@store/other';
import { OtherTsx } from './Other';

const mapState = createStructuredSelector({});

const mapDispatch = {
  resetGlobalCache,
};

export default connect(
  mapState,
  mapDispatch
)(OtherTsx);
