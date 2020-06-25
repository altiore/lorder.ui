import React, { useCallback, useMemo } from 'react';
import MediaQuery from 'react-responsive';

import cn from 'classnames';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import { DialogProps } from '@material-ui/core/Dialog';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@components/@icons/Settings';

import StartStopButton from '#/@common/StartStopButton';
import TaskDuration from '#/@common/TaskDuration';
import TypeIcon from '#/@common/TypeIcon';
import { TASKS_ROUTE } from '#/@store/router';

import { useStyles } from './styles';

import { ACCESS_LEVEL, IProject, ITask } from '@types';

export interface ITaskComponentProps {
  getTaskById: (id: number | string) => ITask;
  isCurrent: boolean;
  isPaused: boolean;
  project: IProject;
  push: any;
  taskId: number | string;
  timerComponent?: React.ReactNode;
  openDialog: (c: React.ReactNode, d?: Partial<DialogProps>) => any;
  openTaskModal: any;
  showWarning: any;
  startUserWork: any;
}

export const TaskComponentTsx: React.FC<ITaskComponentProps> = ({
  getTaskById,
  isCurrent,
  isPaused,
  openTaskModal,
  project,
  push,
  showWarning,
  startUserWork,
  taskId,
}) => {
  console.log('isCurrent ' + isCurrent);
  console.log('isPaused ' + isPaused);

  const classes = useStyles(project.accessLevel || ACCESS_LEVEL.WHITE);
  const theme = useTheme();

  const task = useMemo(() => {
    return getTaskById(taskId);
  }, [getTaskById, taskId]);

  const isShown = useMemo(() => Boolean(task && project && project.id), [task, project]);

  const projectShortName = useMemo(() => {
    if (!isShown) {
      return '...';
    }
    return project.shortName;
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

  const goToProjectAskCreateTask = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();

      push(`/projects/${project.id}`);

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

  if (!task) {
    return null;
  }

  return (
    <div
      className={cn(classes.listItem, {
        [classes.listItemCurrent]: isCurrent,
        [classes.listItemPaused]: isPaused && isCurrent,
      })}
    >
      <div className={classes.title}>
        <MediaQuery minWidth={theme.breakpoints.values.sm}>
          <Tooltip title={`Открыть "${(project && project.title) || '...'}"`} placement="bottom">
            <Button
              component="a"
              href={isShown ? `/projects/${project.id}` : '#'}
              className={cn(classes.projectButton, {
                [classes.projectButtonCurrent]: isCurrent,
                [classes.projectButtonPaused]: isCurrent && isPaused,
              })}
              classes={{ label: classes.projectText }}
              onClick={goToProjectAskCreateTask}
            >
              <Typography>{projectShortName}</Typography>
            </Button>
          </Tooltip>
        </MediaQuery>
        <Tooltip title="Редактировать задачу" placement="bottom">
          <Button
            component="a"
            className={cn(classes.buttonTitle, {
              [classes.buttonTitleCurrent]: isCurrent,
              [classes.buttonTitlePaused]: isPaused && isCurrent,
            })}
            classes={{ label: classes.buttonTitleLabel }}
            href={isShown ? `${TASKS_ROUTE(project.id)}/${task.sequenceNumber}` : '#'}
            onClick={isShown ? openEditTaskForm(task.sequenceNumber, project.id as number) : undefined}
          >
            <Typography className={classes.sequenceNumber}>
              <b>#</b>
              {task.sequenceNumber}
            </Typography>
            <MediaQuery minWidth={theme.breakpoints.values.sm}>
              {<TypeIcon className={classes.taskIcon} typeId={isShown ? task.typeId : undefined} />}
            </MediaQuery>
            {isShown ? <span>{task.title}</span> : <span>...</span>}
            <MediaQuery minWidth={theme.breakpoints.values.md}>
              <SettingsIcon className={classes.buttonTitleSetting} />
            </MediaQuery>
          </Button>
        </Tooltip>
        <div className={classes.verticalDivider} />
      </div>
      <div className={classes.actions}>
        <TaskDuration taskId={taskId} />
        <div className={classes.startBtnDivider} />
        <StartStopButton task={task} />
      </div>
    </div>
  );
};
