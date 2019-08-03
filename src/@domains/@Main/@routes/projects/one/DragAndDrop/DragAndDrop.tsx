import ButtonBase from '@material-ui/core/ButtonBase';
import amber from '@material-ui/core/colors/amber';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { PatchTaskForm } from '@domains/@common/TaskForm/PatchTaskForm';
import { ProjectTask, STATUS_NAMES } from '@store/projects';
import { TaskCard } from './TaskCard';
import { useStyles } from './styles';

const CARD_WIDTH = 296;

const getListStyle = (isDraggingOver: boolean, height: number) => ({
  background: isDraggingOver ? amber[50] : '#DFE3E6',
  maxHeight: height - 198,
  minHeight: 75.89,
  width: CARD_WIDTH,
});

export interface IDragAndDropProps {
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

export const DragAndDrop: React.FC<IDragAndDropProps> = ({
  items,
  height,
  getAllProjectTasks,
  moveProjectTask,
  projectId,
  statuses,
  theme,
  push,
  openDialog,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getAllProjectTasks(projectId);
  }, [getAllProjectTasks, projectId]);

  const [columns, setColumns] = useState([false, true, true, true, false]);

  // const getList = useCallback((id: string) => items.filter(el => el.status === parseInt(id, 0)), [items]);

  const handleTaskClick = useCallback(
    (taskId: number | string) => () => {
      push({
        pathname: `/projects/${projectId}/tasks/${taskId}`,
        state: {
          modal: true,
          projectId,
          taskId,
        },
      });
    },
    [projectId, push]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

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
        moveProjectTask({
          projectId,
          taskId: parseInt(draggableId, 0),
          status: parseInt(destination.droppableId, 0),
          prevStatus: parseInt(source.droppableId, 0),
        });
      }
    },
    [moveProjectTask, projectId]
  );

  const createTask = useCallback(
    (projectId: number | string, status: number) => () => {
      openDialog(<PatchTaskForm projectId={projectId} initialValues={{ status }} />, { maxWidth: 'lg' });
    },
    [openDialog]
  );

  const toggleCollapse = useCallback(
    (status: number) => () => {
      setColumns(columns => {
        const newColumns = [...columns];
        newColumns[status] = !newColumns[status];
        return newColumns;
      });
    },
    [setColumns]
  );

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {statuses.map(status => {
          const filteredItems = items.filter(el => el.status === status);
          const filteredItemsLength = filteredItems.length;
          return (
            <div className={classes.column} key={status}>
              <Typography variant="h2" className={classes.columnTitle}>
                <span>{STATUS_NAMES[status]}</span>
                {!!filteredItemsLength && (
                  <ButtonBase className={classes.arrowWrap} onClick={toggleCollapse(status)}>
                    <KeyboardArrowDown className={cn(classes.arrow, { [classes.arrowDown]: columns[status] })} />
                  </ButtonBase>
                )}
              </Typography>
              <Droppable droppableId={status.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, height)}
                    className={classes.columnContent}
                  >
                    {columns[status] && filteredItemsLength ? (
                      filteredItems.map((item: ProjectTask, index) => (
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index} type={'div'}>
                          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                            <TaskCard
                              provided={provided}
                              snapshot={snapshot}
                              {...item}
                              onClick={handleTaskClick(item.id)}
                            />
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div
                        className={cn(classes.placeholderCard, { [classes.pointer]: !!filteredItemsLength })}
                        onClick={toggleCollapse(status)}
                      >
                        {filteredItemsLength} задач
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <ButtonBase className={classes.columnFooter} onClick={createTask(projectId, status)}>
                <AddIcon fontSize="small" /> Добавить задачу
              </ButtonBase>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

DragAndDrop.defaultProps = {
  statuses: [0, 1, 2, 3, 4],
};
