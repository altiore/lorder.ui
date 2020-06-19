import React, { useCallback, useEffect } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import cn from 'classnames';

import ButtonBase from '@material-ui/core/ButtonBase';
import amber from '@material-ui/core/colors/amber';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import { PatchTaskForm } from '#/@common/TaskForm';
import { TASKS_ROUTE } from '#/@store/router';
import { STATUS_NAMES, Task } from '#/@store/tasks';

import { useStyles } from './styles';
import { TaskCard } from './TaskCard';

import { ITaskColumn } from '@types';

const CARD_WIDTH = 296;

const getListStyle = (isDraggingOver: boolean, height: number) => ({
  background: isDraggingOver ? amber[50] : '#DFE3E6',
  maxHeight: height - 198,
  minHeight: 75.89,
  width: CARD_WIDTH,
});

export interface IDragAndDropProps {
  columns: ITaskColumn[];
  fetchProjectTasks: any;
  height: number;
  items: Task[];
  moveProjectTask: any;
  openDialog: any;
  openedStatuses: string[];
  projectId: number;
  push: any;
  toggleOpenedTab: any;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({
  columns,
  fetchProjectTasks,
  height,
  items,
  moveProjectTask,
  openDialog,
  openedStatuses,
  projectId,
  push,
  toggleOpenedTab,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchProjectTasks(projectId);
  }, [fetchProjectTasks, projectId]);

  // const getList = useCallback((id: string) => items.filter(el => el.status === parseInt(id, 0)), [items]);

  const handleToggleOpened = useCallback(
    e => {
      const toggledStatus = e.currentTarget.value;
      if (typeof toggledStatus === 'string') {
        toggleOpenedTab(toggledStatus);
      } else {
        console.log('current target is', e.currentTarget);
      }
    },
    [toggleOpenedTab]
  );

  const handleTaskClick = useCallback(
    (sequenceNumber: number | string) => () => {
      push({
        pathname: `${TASKS_ROUTE(projectId)}/${sequenceNumber}`,
        state: {
          modal: true,
          projectId,
          sequenceNumber,
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
          prevStatusTypeName: source.droppableId,
          projectId,
          sequenceNumber: parseInt(draggableId, 0),
          statusTypeName: destination.droppableId,
        });
      }
    },
    [moveProjectTask, projectId]
  );

  const createTask = useCallback(
    (pId: number | string, statusName: string, statusFrom) => () => {
      openDialog(<PatchTaskForm projectId={pId} initialValues={{ statusTypeName: statusName, status: statusFrom }} />, {
        maxWidth: 'lg',
      });
    },
    [openDialog]
  );

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map(({ name, statusFrom }) => {
          const filteredItems = items.filter(el => el.statusTypeName === name);
          const filteredItemsLength = filteredItems.length;
          return (
            <div className={classes.column} key={name}>
              <Typography variant="h6" className={classes.columnTitle}>
                <span>{STATUS_NAMES[name] || name}</span>
                {!!filteredItemsLength && (
                  <ButtonBase value={name} className={classes.arrowWrap} onClick={handleToggleOpened}>
                    <KeyboardArrowDown
                      className={cn(classes.arrow, { [classes.arrowDown]: openedStatuses.indexOf(name) !== -1 })}
                    />
                  </ButtonBase>
                )}
              </Typography>
              <Droppable droppableId={name}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, height)}
                    className={classes.columnContent}
                  >
                    {openedStatuses.indexOf(name) !== -1 && filteredItemsLength ? (
                      filteredItems.map((item: Task, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.sequenceNumber ? item.sequenceNumber.toString() : '0'}
                            index={index}
                            type={'div'}
                          >
                            {(draggableProvided: DraggableProvided, draggableStateSnapshot: DraggableStateSnapshot) => (
                              <TaskCard
                                provided={draggableProvided}
                                snapshot={draggableStateSnapshot}
                                {...item}
                                onClick={handleTaskClick(item.sequenceNumber)}
                              />
                            )}
                          </Draggable>
                        );
                      })
                    ) : (
                      <ButtonBase
                        value={name}
                        className={cn(classes.placeholderCard, { [classes.pointer]: !!filteredItemsLength })}
                        onClick={handleToggleOpened}
                      >
                        {filteredItemsLength} задач
                      </ButtonBase>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <ButtonBase className={classes.columnFooter} onClick={createTask(projectId, name, statusFrom)}>
                <AddIcon fontSize="small" /> Добавить задачу
              </ButtonBase>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
