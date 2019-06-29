import { connect } from 'react-redux';

import { IState } from '@types';
import { Notification } from './Notification';

const { hide } = require('react-notification-system-redux');

const mapState = (state: IState) => ({ notifications: state.notifications });
const mapDispatch = {
  hide,
};

export default connect(
  mapState,
  mapDispatch
)(Notification);
