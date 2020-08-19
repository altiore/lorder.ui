import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { changeRangeFilter, curRangeFilter, IRangeFilter } from '#/@store/ui';
import { getRangeDuration } from '#/@store/user-works';

import { DailyRoutineMain } from './daily-routine-main';

import { IState } from '@types';

interface IMappedProps {
  curRangeFilter: IRangeFilter;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  curRangeFilter,
});

const mapDispatch = {
  changeRangeFilter,
  getRangeDuration,
};

export default connect(mapStateToProps, mapDispatch)(DailyRoutineMain);
