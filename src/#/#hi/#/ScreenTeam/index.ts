import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { altioreHighLevelMembers, isPublicAltioreLoaded, isPublicAltioreLoading } from '#/@store/publicAltiore';

import ScreenTeam from './ScreenTeam';

import { IState } from '@types';

interface IMappedProps {
  isPublicAltioreLoaded: boolean;
  isPublicAltioreLoading: boolean;
  team: any[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isPublicAltioreLoaded,
  isPublicAltioreLoading,
  team: altioreHighLevelMembers,
} as any);

export default connect(mapState)(ScreenTeam);
