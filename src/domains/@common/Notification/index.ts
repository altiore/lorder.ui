import { connect } from 'react-redux';
const { hide } = require('react-notification-system-redux');

import { IState } from 'src/@types';
import { Notification } from './Notification';

const mapState = (state: IState) => ({ notifications: state.notifications });
const mapDispatch = {
  hide,
};

export default connect(
  mapState,
  mapDispatch
)(Notification);
