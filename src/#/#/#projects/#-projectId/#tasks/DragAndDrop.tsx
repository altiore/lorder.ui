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
import { DEFAULT_TRANSITION_DURATION } from '#/@store/dialog';
import { TASKS_ROUTE } from '#/@store/router';
import { EDIT_TASK_FORM, STATUS_NAMES, Task } from '#/@store/tasks';

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
  destroy: any;
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
  destroy,
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
    async (result: DropResult) => {
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
        try {
          const taskSN = parseInt(draggableId, 0);
          const task = items.find(el => el.projectId === projectId && el.sequenceNumber === taskSN);
          if (task) {
            await moveProjectTask({
              prevStatusTypeName: task.statusTypeName,
              projectId,
              sequenceNumber: parseInt(draggableId, 0),
              statusTypeName: destination.droppableId,
            });
          }
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.log(e);
          }
        }
      }
    },
    [items, moveProjectTask, projectId]
  );

  /**
   * Удаление формы должно быть ручное, потому что мы не удаляем данные, чтоб отображать их в момент закрытия формы
   */
  const handleCloseTaskFrom = useCallback(() => {
    setTimeout(() => {
      destroy(EDIT_TASK_FORM);
    }, DEFAULT_TRANSITION_DURATION);
  }, [destroy]);

  const createTask = useCallback(
    (pId: number | string, statusName: string, statusFrom) => () => {
      openDialog(<PatchTaskForm projectId={pId} initialValues={{ statusTypeName: statusName, status: statusFrom }} />, {
        maxWidth: 'lg',
        onClose: handleCloseTaskFrom,
      });
    },
    [handleCloseTaskFrom, openDialog]
  );

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map(({ column, statuses }, statusFrom) => {
          const filteredItems = items.filter(el => statuses.includes(el.statusTypeName));
          const filteredItemsLength = filteredItems.length;
          return (
            <div className={classes.column} key={column}>
              <Typography variant="h6" className={classes.columnTitle}>
                <span>
                  {STATUS_NAMES[column] || column} -{' '}
                  {filteredItems.reduce((res, cur) => {
                    return res + cur.value;
                  }, 0)}
                </span>
                {!!filteredItemsLength && (
                  <ButtonBase value={column} className={classes.arrowWrap} onClick={handleToggleOpened}>
                    <KeyboardArrowDown
                      className={cn(classes.arrow, { [classes.arrowDown]: openedStatuses.indexOf(column) !== -1 })}
                    />
                  </ButtonBase>
                )}
              </Typography>
              <Droppable droppableId={column}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, height)}
                    className={classes.columnContent}
                  >
                    {openedStatuses.indexOf(column) !== -1 && filteredItemsLength ? (
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
                        value={column}
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
              <ButtonBase className={classes.columnFooter} onClick={createTask(projectId, column, statusFrom)}>
                <AddIcon fontSize="small" /> Добавить задачу
              </ButtonBase>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
