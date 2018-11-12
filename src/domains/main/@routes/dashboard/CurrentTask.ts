import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedProject } from 'src/store/projects';
import { currentTask } from 'src/store/timer';
import { TaskComponent } from './TaskComponent';

const mapStateToProps = createStructuredSelector({
  isCurrent: () => true,
  project: selectedProject,
  task: currentTask,
});

export const CurrentTask = connect(mapStateToProps)(TaskComponent);
