import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTimeHumanize } from 'src/store/timer';
import { TimerCellJsx } from './TimerCell';

const mapStateToProps = createStructuredSelector({
  currentTimeHumanize,
});

export const TimerCell = connect(mapStateToProps)(TimerCellJsx);
