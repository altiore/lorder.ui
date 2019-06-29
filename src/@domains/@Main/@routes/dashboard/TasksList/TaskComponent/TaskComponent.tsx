import Button from '@material-ui/core/Button';
import { DialogProps } from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Popover from 'react-popover';
import MediaQuery from 'react-responsive';

import { ITask } from '@types';
import TaskTypeIcon from '@components/@icons/TaskTypeIcon';
import { StartStopBtn } from '@components/StartStopBtn';
import { LinkButton } from '@domains/@common/LinkButton';
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
              <LinkButton className={classes.projectButton} to={isShown ? `/projects/${project.id}` : '#'}>
                <Typography className={classes.projectText}>{isShown ? project.title : '...'}</Typography>
              </LinkButton>
            </div>
          </Tooltip>
        </MediaQuery>
        <Tooltip title="Редактировать задачу" placement="bottom">
          <Button
            component="a"
            classes={{ label: classes.buttonTitleLabel }}
            className={classes.buttonTitle}
            href={isShown ? `/projects/${project.id}/tasks/${task.id}` : '#'}
            onClick={isShown ? this.openEditTaskForm(task.id, project.id as number) : undefined}
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

  private openEditTaskForm = (id: number | string, projectId: number | string) => (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.push({
      pathname: `/projects/${projectId}/tasks/${id}`,
      state: {
        modal: true,
        projectId,
        taskId: id,
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

  private stopUserWork = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    this.props.stopUserWork();
  };
}
