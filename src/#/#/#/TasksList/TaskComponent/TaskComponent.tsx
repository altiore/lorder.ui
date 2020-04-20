import React, { useCallback, useState } from 'react';
import Popover from 'react-popover';
import MediaQuery from 'react-responsive';

import Button from '@material-ui/core/Button';
import { DialogProps } from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import TaskTypeIcon from '@components/@icons/TaskTypeIcon';
import { StartStopBtn } from '@components/StartStopBtn';

import { Project } from '#/@store/projects';
import { TASKS_ROUTE } from '#/@store/router';

import moment from 'moment';

import { useStyles } from './styles';
import { TimerListItemText } from './TimerListItemText';
import { UserWorkTable } from './UserWorkTable';

import { ITask } from '@types';

export interface ITaskComponentProps {
  isCurrent: boolean;
  project: Project;
  push: any;
  task: ITask;
  timerComponent?: React.ReactNode;
  openDialog: (c: React.ReactNode, d?: Partial<DialogProps>) => any;
  openTaskModal: any;
  showWarning: any;
  startUserWork: any;
  stopUserWork: any;
}

export const TaskComponentTsx: React.FC<ITaskComponentProps> = ({
  isCurrent,
  openTaskModal,
  project,
  push,
  showWarning,
  startUserWork,
  stopUserWork,
  task,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [isWorkTableOpen, setIsWorkTableOpen] = useState(false);

  const openEditTaskForm = useCallback(
    (sequenceNumber: number | string, projectId: number | string) => (e: React.SyntheticEvent) => {
      e.preventDefault();
      push({
        pathname: `${TASKS_ROUTE(projectId)}/${sequenceNumber}`,
        state: {
          modal: true,
          projectId,
          sequenceNumber,
        },
      });
    },
    [push]
  );

  const onToggleOpenWorkTable = useCallback(() => setIsWorkTableOpen(st => !st), [setIsWorkTableOpen]);

  const startUserTask = useCallback(
    (task: ITask) => (event: React.SyntheticEvent) => {
      if (!task) {
        return;
      }
      const { id, projectId } = task;
      event.stopPropagation();
      startUserWork({
        projectId,
        taskId: id,
      });
    },
    [startUserWork]
  );

  const goToProjectAskCreateTask = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();

      push(project.uuid ? `/p/${project.uuid}` : `/projects/${project.id}`);

      const taskTitle = `Обзор проекта "${project.title}" ` + moment().format('DD-MM-YYYY');
      showWarning({
        action: {
          // callback: this.props.openTaskModal,
          callback: async () => {
            await startUserWork({
              projectId: project.id as number,
              title: taskTitle,
            });
            showWarning({
              action: {
                callback: openTaskModal,
                label: 'Редактировать',
              },
              message: `Хотите ее отредактировать?`,
              title: `Задача для обзора проекта "${project.title}" успешно создана!`,
            });
          },
          label: 'Создать задачу',
        },
        message: `Хотите создать новую задачу для обзора?`,
        title: `Вы перешли к обзору проекта "${project.title}"`,
      });
    },
    [openTaskModal, project, push, showWarning, startUserWork]
  );

  const handleStopUserWork = useCallback(
    (event: React.SyntheticEvent) => {
      event.stopPropagation();
      stopUserWork();
    },
    [stopUserWork]
  );

  const isShown = task && project && project.id;
  const didNotTouched = task.duration === '00:00';

  return (
    <ListItem className={classes.listItem}>
      <MediaQuery minWidth={theme.breakpoints.values.sm}>
        <Tooltip title="Открыть доску проекта" placement="bottom">
          <div>
            <Button
              component="a"
              href={isShown ? `/projects/${project.id}` : '#'}
              className={classes.projectButton}
              onClick={goToProjectAskCreateTask}
            >
              <Typography className={classes.projectText}>{isShown ? project.title : '...'}</Typography>
            </Button>
          </div>
        </Tooltip>
      </MediaQuery>
      <Tooltip title="Редактировать задачу" placement="bottom">
        <Button
          component="a"
          classes={{ label: classes.buttonTitleLabel }}
          className={classes.buttonTitle}
          href={isShown ? `${TASKS_ROUTE(project.id)}/${task.sequenceNumber}` : '#'}
          onClick={isShown ? openEditTaskForm(task.sequenceNumber, project.id as number) : undefined}
        >
          {isShown ? <TaskTypeIcon typeId={task.typeId} className={classes.taskIcon} /> : ''}
          {isShown ? task.title : '...'}
        </Button>
      </Tooltip>
      <Popover
        tipSize={4}
        className={classes.userWorkTable}
        isOpen={isWorkTableOpen}
        onOuterAction={onToggleOpenWorkTable}
        body={
          isShown ? <UserWorkTable taskId={task.id} projectId={project.id} onClose={onToggleOpenWorkTable} /> : <div />
        }
      >
        {isCurrent ? (
          <TimerListItemText isOpen={isWorkTableOpen} onClick={onToggleOpenWorkTable} />
        ) : (
          <Tooltip
            placement={'right'}
            title={
              didNotTouched
                ? 'Вы пока не работали над этой задачей'
                : isWorkTableOpen
                ? 'Закрыть подробности'
                : 'Нажмите, чтоб раскрыть подробности'
            }
          >
            <Button
              className={classes.duration}
              onClick={task.duration === '00:00' ? undefined : onToggleOpenWorkTable}
            >
              {task.duration}
            </Button>
          </Tooltip>
        )}
      </Popover>
      <ListItemIcon classes={{ root: classes.listItemRoot }}>
        <StartStopBtn isStarted={isCurrent} onStart={startUserTask(task)} onStop={handleStopUserWork} />
      </ListItemIcon>
    </ListItem>
  );
};
