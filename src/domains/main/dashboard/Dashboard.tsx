import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import StopIcon from '@material-ui/icons/StopRounded';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from 'src/domains/@common/Page';
import { DownloadList } from 'src/store/@common/entities';
import { Project } from 'src/store/projects';
import { Task } from 'src/store/tasks';
import { IUserWorkData, IUserWorkDelete, UserWork } from 'src/store/user-works';
import { StartForm } from './StartForm';
import { TimerListItemText } from './TimerListItemText';
import { UserWorkTable } from './UserWorkTable';

export interface IState {
  open: any;
}

export interface IDashboardProps extends RouteComponentProps<{}> {
  allTasks: DownloadList<Task>;
  classes: any;
  currentTaskId?: number | string;
  isTimerStarted: boolean;
  getAllTasks: any;
  getProjectById: (id: number) => Project;
  startTimer: (userWork: UserWork) => any;
  startUserWork: (data: IUserWorkData) => any;
  stopUserWork: (data: IUserWorkDelete) => any;
}

export class DashboardJsx extends React.PureComponent<IDashboardProps, IState> {
  public state = {
    open: {},
  };

  public componentDidMount() {
    this.props.getAllTasks();
  }

  /**
   * TODO: move to persist first rehydrate place instead of this component,
   *       because we should start timer even if reload any other page, very important!
   */
  public componentWillReceiveProps(nextProps: IDashboardProps) {
    if (
      nextProps.allTasks !== this.props.allTasks &&
      nextProps.isTimerStarted === this.props.isTimerStarted &&
      !nextProps.isTimerStarted
    ) {
      let currentUserWork;
      const currentTask = nextProps.allTasks.list.find(task => {
        currentUserWork = task.userWorks.find(userWork => !userWork.finishAt);
        return !!currentUserWork;
      });
      if (currentTask && currentUserWork) {
        this.setState({ open: { [currentTask.id]: true } });
        this.props.startTimer(currentUserWork);
      }
    }
  }

  public render() {
    const { allTasks } = this.props;
    return (
      <Page>
        <StartForm />
        {allTasks && !!allTasks.length && <List>{allTasks.map(this.renderListItem)}</List>}
      </Page>
    );
  }

  private renderListItem = (task: Task) => {
    const { id, projectId, title, duration, durationInSeconds, userWorks } = task;
    const { classes, currentTaskId, getProjectById } = this.props;
    const currentUserWork = userWorks.find(el => el.id === currentTaskId);
    return [
      <ListItem key={id} button onClick={this.expandListItem(id)}>
        <ListItemIcon>
          {currentUserWork ? (
            <IconButton onClick={this.stopUserWork(currentUserWork.id, projectId)} className={classes.stop}>
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="Play button" className={classes.play} onClick={this.startUserTask(task)}>
              <PlayArrowRounded />
            </IconButton>
          )}
        </ListItemIcon>
        <ListItemText primary={title} className={classes.title} />
        <ListItemText primary={getProjectById(projectId).title} className={classes.project} />
        {currentUserWork ? (
          <ListItemText
            secondary={<TimerListItemText duration={durationInSeconds} initial={currentUserWork.durationInSeconds} />}
            className={classes.duration}
          />
        ) : (
          <ListItemText secondary={duration} className={classes.duration} />
        )}
      </ListItem>,
      <Collapse
        key={`collapse-${id}`}
        in={this.state.open[id]}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}
      >
        <UserWorkTable userWorks={userWorks} />
      </Collapse>,
    ];
  };

  private expandListItem = (id: number) => () => {
    this.setState(({ open }) => ({ open: { [id]: !open[id] } }));
  };

  private startUserTask = ({ id, projectId }: Task) => (event: React.SyntheticEvent) => {
    event.stopPropagation();
    this.setState({ open: { [id]: true } });
    this.props.startUserWork({
      description: 'test',
      projectId,
      taskId: id,
    });
  };

  private stopUserWork = (userWorkId: number | string | undefined, projectId: number) => (
    event: React.SyntheticEvent
  ) => {
    event.stopPropagation();
    if (typeof userWorkId === 'number') {
      this.props.stopUserWork({
        projectId,
        userWorkId,
      });
    } else {
      console.log('deleteUserWork taskId type is %s', typeof projectId);
    }
  };
}
