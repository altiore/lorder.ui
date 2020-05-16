import { connect } from 'react-redux';

import { showSuccess } from '#/@store/notifications';
import { archiveTask } from '#/@store/tasks';

import { DialogHeader } from './DialogHeader';

const mapDispatchToProps = {
  archiveTask,
  showSuccess,
};

export default connect(
  undefined,
  mapDispatchToProps
)(DialogHeader) as any;
