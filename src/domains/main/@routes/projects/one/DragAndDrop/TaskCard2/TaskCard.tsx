import * as React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { ProjectTask } from 'src/store/projects';
import { TaskCard } from '../TaskCard';

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  margin: `0 0 ${grid}px 0`,
  padding: 0,
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const TaskCardTsx = (task: ProjectTask) => (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <TaskCard {...task} />
    </div>
  );
};
