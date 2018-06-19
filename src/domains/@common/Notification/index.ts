import { connect } from 'react-redux';

import { IState } from 'src/store/rootReducer';
import { Notification } from './Notification';

export default connect(
  (state: IState) => ({ notifications: state.notifications }),
)(Notification);