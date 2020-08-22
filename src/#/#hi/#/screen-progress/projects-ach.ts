import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { activeProjectsCount } from '#/@store/statistics';

import Achievement from './achievement';

import { IState } from '@types';

interface IMapped {
  value: number;
}

const mapState = createStructuredSelector<IState, IMapped>({
  value: activeProjectsCount,
});

export default connect(mapState)(Achievement);
