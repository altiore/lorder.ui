import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isPublicLorderLoaded, isPublicLorderLoading, lorderMembers } from '#/@store/publicLorder';

import ScreenProgress from './screen-progress';

import { IState } from '@types';

interface IMappedProps {
  isPublicLorderLoaded: boolean;
  isPublicLorderLoading: boolean;
  team: any[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isPublicLorderLoaded,
  isPublicLorderLoading,
  team: lorderMembers,
} as any);

export default connect(mapState)(ScreenProgress);
