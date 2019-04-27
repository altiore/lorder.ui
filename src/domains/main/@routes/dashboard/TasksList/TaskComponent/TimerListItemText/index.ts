import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTimeWithLocal } from 'store/timer';
import { TimerListItemTextJsx } from './TimerListItemText';

const mapStateToProps = createStructuredSelector({
  time: currentTimeWithLocal,
});

export const TimerListItemText = connect(mapStateToProps)(TimerListItemTextJsx);
