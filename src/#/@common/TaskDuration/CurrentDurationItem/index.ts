import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentTimeWithLocal } from '#/@store/timer';

import { CurrentDurationItemTsx } from './CurrentDurationItem';

const mapStateToProps = createStructuredSelector({
  time: currentTimeWithLocal,
} as any);

export default connect<any, any, any>(mapStateToProps)(CurrentDurationItemTsx);
