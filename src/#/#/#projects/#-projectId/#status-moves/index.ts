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

import { StatusMovesJsx } from './status-moves';

import { IProjectRole, IState } from '@types';

interface IMappedProps {
  list: any;
  projectRoles: IProjectRole[];
  taskStatusesList: any;
}

const mapStateToProps = createStructuredSelector<IState, IMappedProps>({
  list: taskStatusMoves,
  projectRoles,
  taskStatusesList,
});

const mapDispatchToProps = {
  createItem: createProjectStatusMove,
  deleteItem: deleteTaskStatusMove,
  fetchItems: fetchProjectStatusMoves,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusMovesJsx);
