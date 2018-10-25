import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTime } from 'src/store/timer';
import { TimerListItemTextJsx } from './TimerListItemText';

const mapStateToProps = createStructuredSelector({
  currentTime,
});

export const TimerListItemText = connect(mapStateToProps)(TimerListItemTextJsx);
