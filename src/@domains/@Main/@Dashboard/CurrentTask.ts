import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectedProject } from '@store/projects';
import { currentTask } from '@store/timer';
import { TaskComponent } from './TaskComponent';

const mapStateToProps = createStructuredSelector({
  isCurrent: () => true,
  project: selectedProject,
  task: currentTask as any,
});

export const CurrentTask = connect(mapStateToProps)(TaskComponent as any);
