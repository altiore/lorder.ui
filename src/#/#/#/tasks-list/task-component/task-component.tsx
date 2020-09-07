import React, { useCallback, useMemo } from 'react';
import MediaQuery from 'react-responsive';

import cn from 'classnames';

import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@components/@icons/Settings';

import StartStopButton from '#/@common/start-stop-btn';
import TaskDuration from '#/@common/task-duration';
import TypeIcon from '#/@common/type-icon';
import { TASKS_ROUTE } from '#/@store/router';

import { useStyles } from './styles';

import { ACCESS_LEVEL, IProject, ITask } from '@types';

export interface ITaskComponentProps {
  defaultProjectId?: number;
  getTaskById: (id: number | string) => ITask;
  goToProjectWithAsk: any;
  isCurrent: boolean;
  isPaused: boolean;
  isRelax: boolean;
  project: IProject;
  push: any;
  taskId: number | string;
}

export const TaskComponentTsx: React.FC<ITaskComponentProps> = ({
  defaultProjectId,
  getTaskById,
  goToProjectWithAsk,
  isCurrent,
  isPaused,
  isRelax,
  project,
  push,
  taskId,
}) => {
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

      goToProjectWithAsk(project);
    },
    [goToProjectWithAsk, project]
  );

  if (!task) {
    return null;
  }

  return (
    <div
      className={cn(classes.listItem, {
        [classes.listItemCurrent]: isCurrent,
        [classes.listItemPaused]: (isPaused || isRelax) && isCurrent,
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
                [classes.projectButtonPaused]: isCurrent && (isPaused || isRelax),
              })}
              classes={{ label: classes.projectText }}
              onClick={goToProjectAskCreateTask}
            >
              <Typography style={{ zIndex: 1 }}>{projectShortName}</Typography>
            </Button>
          </Tooltip>
        </MediaQuery>
        <Tooltip title="Редактировать задачу" placement="bottom">
          <Button
            component="a"
            className={cn(classes.buttonTitle, {
              [classes.buttonTitleCurrent]: isCurrent,
              [classes.buttonTitlePaused]: (isPaused || isRelax) && isCurrent,
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
        {defaultProjectId !== task?.projectId ? <StartStopButton task={task} /> : <div className={classes.emptyBtn} />}
      </div>
    </div>
  );
};
