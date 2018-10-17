import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTime } from 'src/store/timer';
import { TimerCellJsx } from './TimerCell';

const mapStateToProps = createStructuredSelector({
  currentTime,
});

export const TimerCell = connect(mapStateToProps)(TimerCellJsx);
