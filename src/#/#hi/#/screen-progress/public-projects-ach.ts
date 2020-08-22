import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { ROUTE } from '#/@store/router';
import { publicProjectsCount } from '#/@store/statistics';

import Achievement from './achievement';

import { IState } from '@types';

interface IMapped {
  link: string;
  value: number;
}

const link = () => ROUTE.PUBLIC.LIST;

const mapState = createStructuredSelector<IState, IMapped>({
  link,
  value: publicProjectsCount,
});

export default connect(mapState)(Achievement);
