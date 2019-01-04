import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { PatchTaskForm } from 'src/domains/@common/TaskForm';
import { DownloadList } from 'src/store/@common/entities';
import { ProjectTask } from 'src/store/projects';
import { TaskCard } from './TaskCard';

const grid = 8;
const CARD_WIDTH = 300;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#DFE3E6' : '#DFE3E6',
  padding: grid,
  width: CARD_WIDTH,
});

export interface IDragAndDropProps {
  classes: any;
  items: DownloadList<ProjectTask>;
  getAllProjectTasks: any;
  moveProjectTask: any;
  statuses: number[];
  openDialog: any;
  projectId: number;
}

export interface IDragAndDropState {
  items: any[];
  selected: any[];
  selected2: any[];
}

const STATUS_NAMES = ['Резерв', 'Сделать', 'В процессе', 'Обзор', 'Готово'];

export class DragAndDrop extends React.Component<IDragAndDropProps, IDragAndDropState> {
  static defaultProps = {
    statuses: [0, 1, 2, 3, 4],
  };

  componentDidMount(): void {
    this.props.getAllProjectTasks();
  }

  getList = (id: string) => this.props.items.list.filter(el => el.status === parseInt(id, 0));

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
    const { classes, statuses, items } = this.props;
    return (
      <div className={classes.root} style={{ width: statuses.length * (CARD_WIDTH + grid) }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {statuses.map(status => (
            <Droppable key={status} droppableId={status.toString()}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={classes.column}>
                  <Typography variant="h2" className={classes.columnTitle}>
                    {STATUS_NAMES[status]}
                  </Typography>
                  {items.list.filter(el => el.status === status).map((item: ProjectTask, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <TaskCard
                          provided={provided}
                          snapshot={snapshot}
                          {...item}
                          onClick={this.handleTaskClick(item.id)}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    );
  }

  private handleTaskClick = (taskId: number | string) => () => {
    this.props.openDialog(<PatchTaskForm taskId={taskId} projectId={this.props.projectId} buttonText="Сохранить" />, {
      scroll: 'body',
    });
  };
}
