import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activeProjectsCount } from '#/@store/statistics';

import Achievement from './Achievement';

import { IState } from '@types';

const mapState = createStructuredSelector<IState, { value: number }>({
  value: activeProjectsCount,
});

export default connect(mapState)(Achievement);
