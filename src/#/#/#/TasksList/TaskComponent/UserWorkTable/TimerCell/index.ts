import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTimeHumanize } from '#/@store/timer';
import { TimerCellJsx } from './TimerCell';

const mapStateToProps = createStructuredSelector({
  currentTimeHumanize,
} as any);

export const TimerCell = connect<any, any, any>(mapStateToProps)(TimerCellJsx);
