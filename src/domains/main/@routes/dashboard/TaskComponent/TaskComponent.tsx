import Button from '@material-ui/core/Button';
import { DialogProps } from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import * as React from 'react';
import * as Popover from 'react-popover';
import MediaQuery from 'react-responsive';

import { StartStopBtn } from 'src/components/StartStopBtn';
import { LinkButton } from 'src/domains/@common/LinkButton';
import { DashboardTaskForm } from 'src/domains/@common/TaskForm';
import { Project } from 'src/store/projects';
import { Task } from 'src/store/tasks';
import { TimerListItemText } from './TimerListItemText';
import { UserWorkTable } from './UserWorkTable';

export interface ITaskComponentProps {
  classes?: any;
  theme: Theme;
  isCurrent: boolean;
  project: Project;
  task: Task;
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
    if (!task || !project || !project.id) {
      return null;
    }

    const { isWorkTableOpen } = this.state;
    return (
      <ListItem className={classes.listItem}>
        <MediaQuery minWidth={theme.breakpoints.values.sm}>
          <LinkButton
            className={classes.buttonProject}
            to={project.uuid ? `/p/${project.uuid}` : `/projects/${project.id}`}
          >
            {project.title}
          </LinkButton>
        </MediaQuery>
        <Button
          classes={{ label: classes.buttonTitleLabel }}
          className={classes.buttonTitle}
          onClick={this.openEditTaskForm(task.id, project.id)}
        >
          {task.title}
        </Button>
        <Popover
          tipSize={4}
          className={classes.userWorkTable}
          isOpen={isWorkTableOpen}
          onOuterAction={this.onToggleOpenWorkTable}
          body={
            <UserWorkTable
              userWorks={task.userWorks}
              taskId={task.id}
              projectId={project.id}
              onClose={this.onToggleOpenWorkTable}
            />
          }
        >
          {isCurrent ? (
            <TimerListItemText isOpen={isWorkTableOpen} onClick={this.onToggleOpenWorkTable} />
          ) : (
            <Tooltip
              placement={'right'}
              title={isWorkTableOpen ? 'Закрыть подробности' : 'Нажмите, чтоб раскрыть подробности'}
            >
              <Button className={classes.duration} onClick={this.onToggleOpenWorkTable}>
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

  private openEditTaskForm = (id: number | string, projectId: number | string) => () => {
    const { openDialog } = this.props;
    openDialog(<DashboardTaskForm taskId={id} projectId={projectId} buttonText="Сохранить" />);
  };

  private onToggleOpenWorkTable = () => this.setState(({ isWorkTableOpen }) => ({ isWorkTableOpen: !isWorkTableOpen }));

  private startUserTask = ({ id, projectId }: Task) => (event: React.SyntheticEvent) => {
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
