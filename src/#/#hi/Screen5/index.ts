import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IProjectMember, IState } from '@types';
import { altioreMembers, isPublicAltioreLoaded, isPublicAltioreLoading } from '#/@store/publicAltiore';
import Screen5 from './Screen5';

interface IMappedProps {
  isPublicAltioreLoaded: boolean;
  isPublicAltioreLoading: boolean;
  team: IProjectMember[];
}

const mapState = createStructuredSelector<IState, IMappedProps>({
  isPublicAltioreLoaded,
  isPublicAltioreLoading,
  team: altioreMembers,
});

export default connect(mapState)(Screen5);
