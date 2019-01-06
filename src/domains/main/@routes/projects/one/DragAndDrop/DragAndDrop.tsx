import ButtonBase from '@material-ui/core/ButtonBase';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { AddTaskForm, PatchTaskForm } from 'src/domains/@common/TaskForm';
import { DownloadList } from 'src/store/@common/entities';
import { ProjectTask } from 'src/store/projects';
import { TaskCard } from './TaskCard';

const CARD_WIDTH = 296;

const getListStyle = (isDraggingOver: boolean, height: number) => ({
  background: isDraggingOver ? '#DFE3E6' : '#DFE3E6',
  maxHeight: height - 188,
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
  theme: Theme;
  height: number;
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
    const { classes, statuses, items, theme, height, projectId } = this.props;
    return (
      <div className={classes.root} style={{ width: statuses.length * (CARD_WIDTH + theme.spacing.unit * 1.5) }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {statuses.map(status => (
            <div className={classes.column} key={status}>
              <Typography variant="h2" className={classes.columnTitle}>
                {STATUS_NAMES[status]}
              </Typography>
              <Droppable droppableId={status.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, height)}
                    className={classes.columnContent}
                  >
                    {items.list.filter(el => el.status === status).map((item: ProjectTask, index) => (
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
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <ButtonBase className={classes.columnFooter} onClick={this.createTask(projectId)}>
                <AddIcon fontSize="small" /> Добавить задачу
              </ButtonBase>
            </div>
          ))}
        </DragDropContext>
      </div>
    );
  }

  private handleTaskClick = (taskId: number | string) => () => {
    this.props.openDialog(<PatchTaskForm taskId={taskId} projectId={this.props.projectId} buttonText="Сохранить" />, {
      maxWidth: 'lg',
    });
  };

  private createTask = (projectId: number | string) => () => {
    this.props.openDialog(<AddTaskForm buttonText="Создать задачу" projectId={projectId} />, { maxWidth: 'lg' });
  };
}
