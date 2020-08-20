import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { changeRangeFilter, curRangeFilter, currentRange, IRangeFilter } from '#/@store/ui';
import { getRangeDuration } from '#/@store/user-works';

import { DailyRoutineMain } from './daily-routine-main';

import { IState } from '@types';

interface IMappedProps {
  curRangeFilter: IRangeFilter;
  currentRange: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  curRangeFilter,
  currentRange,
});

const mapDispatch = {
  changeRangeFilter,
  getRangeDuration,
};

export default connect(mapStateToProps, mapDispatch)(DailyRoutineMain);
