import { connect } from 'react-redux';

import { showSuccess } from '#/@store/notifications';
import { archiveTask } from '#/@store/tasks';

import { DialogHeader } from './dialog-header';

const mapDispatchToProps = {
  archiveTask,
  showSuccess,
};

export default connect(undefined, mapDispatchToProps)(DialogHeader);
