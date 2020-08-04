import { connect } from 'react-redux';

import { Notification } from './notification';

import { IState } from '@types';

const { hide } = require('react-notification-system-redux');

const mapState = (state: IState) => ({ notifications: state.notifications });
const mapDispatch = {
  hide,
};

export default connect(mapState, mapDispatch)(Notification);
