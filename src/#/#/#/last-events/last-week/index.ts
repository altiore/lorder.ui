import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import Range from '@components/range';

import { lastWeekTimeSpentToday, lastWeekUserWorksWithoutDefault } from '#/@store/user-works';

import { IState, IUserWork } from '@types';

interface IMappedProps {
  rangeUserWorks: IUserWork[];
  title: string;
  total: string;
}

const curTitle = () => 'Неделя';

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  rangeUserWorks: lastWeekUserWorksWithoutDefault,
  title: curTitle,
  total: lastWeekTimeSpentToday,
});

export default connect(mapStateToProps)(Range);
