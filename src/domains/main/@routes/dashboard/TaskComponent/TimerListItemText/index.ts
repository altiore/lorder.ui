import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTaskTime } from 'src/store/timer';
import { TimerListItemTextJsx } from './TimerListItemText';

const mapStateToProps = createStructuredSelector({
  time: currentTaskTime,
});

export const TimerListItemText = connect(mapStateToProps)(TimerListItemTextJsx);
