import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentTaskTime } from '@store/timer';
import { TimerListItemTextJsx } from './TimerListItemText';

const mapStateToProps = createStructuredSelector({
  time: currentTaskTime,
} as any);

export const TimerListItemText = connect<any, any, any>(mapStateToProps)(TimerListItemTextJsx);
