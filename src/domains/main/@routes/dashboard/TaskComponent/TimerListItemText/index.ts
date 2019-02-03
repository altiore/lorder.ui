import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTaskTimeWithLocal } from 'src/store/timer';
import { TimerListItemTextJsx } from './TimerListItemText';

const mapStateToProps = createStructuredSelector({
  time: currentTaskTimeWithLocal,
});

export const TimerListItemText = connect(mapStateToProps)(TimerListItemTextJsx);
