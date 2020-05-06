import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { altioreMembers, isPublicAltioreLoaded, isPublicAltioreLoading } from '#/@store/publicAltiore';

import ScreenProgress from './ScreenProgress';

import { IState } from '@types';

interface IMappedProps {
  isPublicAltioreLoaded: boolean;
  isPublicAltioreLoading: boolean;
  team: any[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isPublicAltioreLoaded,
  isPublicAltioreLoading,
  team: altioreMembers,
} as any);

export default connect(mapState)(ScreenProgress);
