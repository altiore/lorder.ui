import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IState } from '@types';
import { publicProjectsCount } from '@store/statistics';
import Achievement from './Achievement';

const mapState = createStructuredSelector<IState, { value: number }>({
  value: publicProjectsCount,
});

export default connect(mapState)(Achievement);
