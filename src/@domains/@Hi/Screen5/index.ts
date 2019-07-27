import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { IProjectMember, IState } from '@types';
import { altioreMembers } from '@store/publicAltiore';
import Screen5 from './Screen5';

const mapState = createStructuredSelector<IState, { team: IProjectMember[] }>({
  team: altioreMembers,
});

export default connect(mapState)(Screen5);
