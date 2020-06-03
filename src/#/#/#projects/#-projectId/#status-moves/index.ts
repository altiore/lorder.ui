import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { projectRoles } from '#/@store/project';
import {
  createProjectStatusMove,
  deleteTaskStatusMove,
  fetchProjectStatusMoves,
  taskStatusMoves,
} from '#/@store/project-status-moves';
import { taskStatusesList } from '#/@store/task-statuses';

import { StatusMovesJsx } from './StatusMoves';

const mapStateToProps = createStructuredSelector({
  list: taskStatusMoves,
  projectRoles,
  taskStatusesList,
} as any);

const mapDispatchToProps = {
  createItem: createProjectStatusMove,
  deleteItem: deleteTaskStatusMove,
  fetchItems: fetchProjectStatusMoves,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusMovesJsx);
