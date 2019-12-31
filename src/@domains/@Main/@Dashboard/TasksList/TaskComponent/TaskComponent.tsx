import React from 'react';

import Button from '@material-ui/core/Button';
import { DialogProps } from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import Popover from 'react-popover';
import MediaQuery from 'react-responsive';

import { ITask } from '@types';
import TaskTypeIcon from '@components/@icons/TaskTypeIcon';
import { StartStopBtn } from '@components/StartStopBtn';
import { Project } from '@store/projects';
import { TimerListItemText } from './TimerListItemText';
import { UserWorkTable } from './UserWorkTable';

export interface ITaskComponentProps {
  classes?: any;
  theme: Theme;
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

interface ITaskComponentState {
  isWorkTableOpen: boolean;
}

export class TaskComponentTsx extends React.PureComponent<ITaskComponentProps, ITaskComponentState> {
  state = {
    isWorkTableOpen: false,
  };

  render() {
    const { classes, isCurrent, project, task, theme } = this.props;
    const isShown = task && project && project.id;

    const { isWorkTableOpen } = this.state;
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
                onClick={this.goToProjectAskCreateTask}
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
            href={isShown ? `/projects/${project.id}/tasks/${task.sequenceNumber}` : '#'}
            onClick={isShown ? this.openEditTaskForm(task.sequenceNumber, project.id as number) : undefined}
          >
            {isShown ? <TaskTypeIcon typeId={task.typeId} className={classes.taskIcon} /> : ''}
            {isShown ? task.title : '...'}
          </Button>
        </Tooltip>
        <Popover
          tipSize={4}
          className={classes.userWorkTable}
          isOpen={isWorkTableOpen}
          onOuterAction={this.onToggleOpenWorkTable}
          body={
            isShown ? (
              <UserWorkTable taskId={task.id} projectId={project.id} onClose={this.onToggleOpenWorkTable} />
            ) : (
              <div />
            )
          }
        >
          {isCurrent ? (
            <TimerListItemText isOpen={isWorkTableOpen} onClick={this.onToggleOpenWorkTable} />
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
                onClick={task.duration === '00:00' ? undefined : this.onToggleOpenWorkTable}
              >
                {task.duration}
              </Button>
            </Tooltip>
          )}
        </Popover>
        <ListItemIcon classes={{ root: classes.listItemRoot }}>
          <StartStopBtn isStarted={isCurrent} onStart={this.startUserTask(task)} onStop={this.stopUserWork} />
        </ListItemIcon>
      </ListItem>
    );
  }

  private openEditTaskForm = (sequenceNumber: number | string, projectId: number | string) => (
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();
    this.props.push({
      pathname: `/projects/${projectId}/tasks/${sequenceNumber}`,
      state: {
        modal: true,
        projectId,
        sequenceNumber,
      },
    });
  };

  private onToggleOpenWorkTable = () => this.setState(({ isWorkTableOpen }) => ({ isWorkTableOpen: !isWorkTableOpen }));

  private startUserTask = (task: ITask) => (event: React.SyntheticEvent) => {
    if (!task) {
      return;
    }
    const { id, projectId } = task;
    event.stopPropagation();
    this.props.startUserWork({
      projectId,
      taskId: id,
    });
  };

  private goToProjectAskCreateTask = (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const { openTaskModal, project, push, showWarning, startUserWork } = this.props;

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
  };

  private stopUserWork = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    this.props.stopUserWork();
  };
}
