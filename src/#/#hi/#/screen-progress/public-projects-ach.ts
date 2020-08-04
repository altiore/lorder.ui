import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { publicProjectsCount } from '#/@store/statistics';

import Achievement from './achievement';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, { value: number }>({
  value: publicProjectsCount,
});

export default connect(mapState)(Achievement);
