import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTimeWithLocal } from 'src/store/timer';
import { TimerListItemTextJsx } from './TimerListItemText';

const mapStateToProps = createStructuredSelector({
  time: currentTimeWithLocal,
});

export const TimerListItemText = connect(mapStateToProps)(TimerListItemTextJsx);
