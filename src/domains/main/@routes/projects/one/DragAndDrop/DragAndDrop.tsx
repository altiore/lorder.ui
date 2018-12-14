import * as React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { DownloadList } from 'src/store/@common/entities';
import { ProjectTask } from 'src/store/projects';
import { TaskCardTsx } from './TaskCard2/TaskCard';

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 300,
});

export interface IDragAndDropProps {
  classes: any;
  items: DownloadList<ProjectTask>;
  getAllProjectTasks: any;
}

export interface IDragAndDropState {
  items: any[];
  selected: any[];
  selected2: any[];
}

export class DragAndDrop extends React.Component<IDragAndDropProps, IDragAndDropState> {
  componentDidMount(): void {
    this.props.getAllProjectTasks();
  }

  getList = (id: string) => this.props.items.list.filter(el => el.status === parseInt(id, 0));

  onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

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
      console.log('move task to another status', {
        destination,
        source,
      });
    }
  };

  render() {
    const { classes, items } = this.props;
    return (
      <div className={classes.root}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {[0, 1, 2].map(status => (
            <Droppable key={status} droppableId={status.toString()}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  <h2>Status {status}</h2>
                  {items.list.filter(el => el.status === status).map((item: ProjectTask, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {TaskCardTsx(item)}
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
}
