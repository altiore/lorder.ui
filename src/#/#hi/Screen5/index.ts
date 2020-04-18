import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { altioreMembers, isPublicAltioreLoaded, isPublicAltioreLoading } from '#/@store/publicAltiore';

import Screen5 from './Screen5';

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

export default connect(mapState)(Screen5);
