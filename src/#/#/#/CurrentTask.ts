import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectedProject } from '#/@store/projects';
import { currentTaskId } from '#/@store/timer';

import TaskComponent from './TasksList/TaskComponent';

const mapStateToProps = createStructuredSelector({
  isCurrent: () => true,
  project: selectedProject,
  taskId: currentTaskId as any,
});

export const CurrentTask = connect(mapStateToProps)(TaskComponent as any);
