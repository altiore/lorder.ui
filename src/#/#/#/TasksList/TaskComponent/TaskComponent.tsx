import React, { useCallback, useMemo } from 'react';
import MediaQuery from 'react-responsive';

import Button from '@material-ui/core/Button';
import { DialogProps } from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import TaskTypeIcon from '@components/@icons/TaskTypeIcon';
import { StartStopBtn } from '@components/StartStopBtn';

import TaskDuration from '#/@common/TaskDuration';
import { Project } from '#/@store/projects';
import { TASKS_ROUTE } from '#/@store/router';

import moment from 'moment';

import { useStyles } from './styles';

import { ITask } from '@types';

export interface ITaskComponentProps {
  getTaskById: (id: number | string) => ITask;
  isCurrent: boolean;
  project: Project;
  push: any;
  taskId: number | string;
  timerComponent?: React.ReactNode;
  openDialog: (c: React.ReactNode, d?: Partial<DialogProps>) => any;
  openTaskModal: any;
  showWarning: any;
  startUserWork: any;
  stopUserWork: any;
}

export const TaskComponentTsx: React.FC<ITaskComponentProps> = ({
  getTaskById,
  isCurrent,
  openTaskModal,
  project,
  push,
  showWarning,
  startUserWork,
  stopUserWork,
  taskId,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const task = useMemo(() => {
    return getTaskById(taskId);
  }, [getTaskById, taskId]);

  const isShown = useMemo(() => Boolean(task && project && project.id), [task, project]);

  const projectShortName = useMemo(() => {
    if (!isShown) {
      return '...';
    }
    const title = project.title;
    const titleParts = title.split(' ');
    if (titleParts.length > 1) {
      return titleParts[0][0].toUpperCase() + titleParts[1][0].toUpperCase();
    } else {
      return `${title[0]}${title[1]}`.toUpperCase();
    }
  }, [isShown, project]);

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

  return (
    <div className={classes.listItem}>
      <div className={classes.title}>
        <MediaQuery minWidth={theme.breakpoints.values.sm}>
          <Tooltip title={`Открыть "${(project && project.title) || '...'}"`} placement="bottom">
            <Button
              component="a"
              href={isShown ? `/projects/${project.id}` : '#'}
              className={classes.projectButton}
              onClick={goToProjectAskCreateTask}
            >
              <Typography className={classes.projectText}>{projectShortName}</Typography>
            </Button>
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
            {<TaskTypeIcon typeId={isShown ? task.typeId : 'feature'} className={classes.taskIcon} />}
            {isShown ? task.title : '...'}
          </Button>
        </Tooltip>
      </div>
      <div className={classes.actions}>
        <TaskDuration taskId={taskId} />
        <StartStopBtn isStarted={isCurrent} onStart={startUserTask(task)} onStop={handleStopUserWork} />
      </div>
    </div>
  );
};
