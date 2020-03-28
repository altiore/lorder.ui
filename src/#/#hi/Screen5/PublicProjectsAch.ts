import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { publicProjectsCount } from '#/@store/statistics';

import Achievement from './Achievement';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, { value: number }>({
  value: publicProjectsCount,
});

export default connect(mapState)(Achievement);
