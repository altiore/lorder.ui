import { connect } from 'react-redux';

import { IState } from 'src/@types';
import { Notification } from './Notification';

export default connect((state: IState) => ({ notifications: state.notifications }))(Notification);
