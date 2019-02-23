import ButtonBase from '@material-ui/core/ButtonBase';
import amber from '@material-ui/core/colors/amber';
import Fab from '@material-ui/core/Fab';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { PatchTaskForm } from 'src/domains/@common/TaskForm/PatchTaskForm';
import { ProjectTask, STATUS_NAMES } from 'src/store/projects';
import { TaskCard } from './TaskCard';

const CARD_WIDTH = 296;

const getListStyle = (isDraggingOver: boolean, height: number) => ({
  background: isDraggingOver ? amber[50] : '#DFE3E6',
  maxHeight: height - 198,
  minHeight: 75.89,
  width: CARD_WIDTH,
});

export interface IDragAndDropProps {
  classes: any;
  items: ProjectTask[];
  getAllProjectTasks: any;
  moveProjectTask: any;
  statuses: number[];
  openDialog: any;
  projectId: number;
  push: any;
  theme: Theme;
  height: number;
}

export interface IDragAndDropState {
  columns: boolean[];
}

export class DragAndDrop extends React.Component<IDragAndDropProps, IDragAndDropState> {
  static defaultProps = {
    statuses: [0, 1, 2, 3, 4],
  };

  state = {
    columns: [false, true, true, true, false],
  };

  componentDidMount(): void {
    this.props.getAllProjectTasks();
  }

  getList = (id: string) => this.props.items.filter(el => el.status === parseInt(id, 0));

  onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const { moveProjectTask } = this.props;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      console.log('just reorder', {
        destination,
        source,
      });
    } else {
      moveProjectTask(parseInt(draggableId, 0), parseInt(destination.droppableId, 0), parseInt(source.droppableId, 0));
    }
  };

  render() {
    const { classes, statuses, items, theme, height, projectId } = this.props;
    const { columns } = this.state;
    return (
      <div className={classes.root} style={{ width: statuses.length * (CARD_WIDTH + theme.spacing.unit * 1.5) }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {statuses.map(status => (
            <div className={classes.column} key={status}>
              <Typography variant="h2" className={classes.columnTitle}>
                {STATUS_NAMES[status]}
                <Fab size="small" onClick={this.toggleCollapse(status)} className={classes.toggle}>
                  {columns[status] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </Fab>
              </Typography>
              <Droppable droppableId={status.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, height)}
                    className={classes.columnContent}
                  >
                    {columns[status] ? (
                      items.filter(el => el.status === status).map((item: ProjectTask, index) => (
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index} type={'div'}>
                          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <TaskCard
                              provided={provided}
                              snapshot={snapshot}
                              {...item}
                              onClick={this.handleTaskClick(item.id)}
                            />
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className={classes.placeholderCard} onClick={this.toggleCollapse(status)}>
                        {items.filter(el => el.status === status).length} задач
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <ButtonBase className={classes.columnFooter} onClick={this.createTask(projectId, status)}>
                <AddIcon fontSize="small" /> Добавить задачу
              </ButtonBase>
            </div>
          ))}
        </DragDropContext>
      </div>
    );
  }

  private handleTaskClick = (taskId: number | string) => () => {
    this.props.push({
      pathname: `/projects/${this.props.projectId}/tasks/${taskId}`,
      state: {
        modal: true,
        projectId: this.props.projectId,
        taskId,
      },
    });
  };

  private createTask = (projectId: number | string, status: number) => () => {
    this.props.openDialog(<PatchTaskForm projectId={projectId} initialValues={{ status }} />, { maxWidth: 'lg' });
  };

  private toggleCollapse = (status: number) => () => {
    const columns = [...this.state.columns];
    columns[status] = !columns[status];
    this.setState({ columns });
  };
}
