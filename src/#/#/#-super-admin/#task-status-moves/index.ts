import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  createTaskStatusMove,
  deleteManyTaskStatusMoves,
  deleteTaskStatusMove,
  fetchTaskStatusMoves,
  taskStatusMoves,
} from '#/@store/task-status-moves';
import { TaskStatusMovesJsx } from './TaskStatusMoves';

const mapStateToProps = createStructuredSelector({
  list: taskStatusMoves,
} as any);

const mapDispatchToProps = {
  createItem: createTaskStatusMove,
  deleteItem: deleteTaskStatusMove,
  deleteBulk: deleteManyTaskStatusMoves,
  fetchItems: fetchTaskStatusMoves,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskStatusMovesJsx);
