import { connect } from 'react-redux';

import { Moment } from 'moment';
import { createStructuredSelector } from 'reselect';

import { lastDayOfCustomRange } from '#/@store/ui';

import WeekRange from '../week-range';

import { IState } from '@types';

interface IMappedProps {
  lastDay: Moment;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  lastDay: lastDayOfCustomRange,
});

export default connect(mapStateToProps)(WeekRange);
