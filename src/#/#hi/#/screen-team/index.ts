import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { isPublicLorderLoaded, isPublicLorderLoading, lorderHighLevelMembers } from '#/@store/publicLorder';

import ScreenTeam from './screen-team';

import { IMember, IState } from '@types';

interface IMappedProps {
  isPublicLorderLoaded: boolean;
  isPublicLorderLoading: boolean;
  team: IMember[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isPublicLorderLoaded,
  isPublicLorderLoading,
  team: lorderHighLevelMembers,
});

export default connect(mapState)(ScreenTeam);
