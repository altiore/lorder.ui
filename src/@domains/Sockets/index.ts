import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { SOCKET_FORM_NAME, socketMessages, updateTask } from '@store/sockets';
import { Sockets } from './Sockets';

const mapState = createStructuredSelector({
  socketMessages,
} as any);

export default connect(mapState)(
  reduxForm({
    form: SOCKET_FORM_NAME,
    onSubmit: updateTask,
  })(Sockets as any)
);
