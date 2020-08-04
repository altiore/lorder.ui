import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isPublicLorderLoaded, isPublicLorderLoading, lorderHighLevelMembers } from '#/@store/publicLorder';

import ScreenTeam from './screen-team';

import { IState } from '@types';

interface IMappedProps {
  isPublicLorderLoaded: boolean;
  isPublicLorderLoading: boolean;
  team: any[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isPublicLorderLoaded,
  isPublicLorderLoading,
  team: lorderHighLevelMembers,
} as any);

export default connect(mapState)(ScreenTeam);
