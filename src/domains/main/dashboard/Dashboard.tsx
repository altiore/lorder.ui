import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';
import LinkIcon from '@material-ui/icons/Link';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Page } from 'src/components/Page';
import { StartStopBtn } from 'src/components/StartStopBtn';
import { Project } from 'src/store/projects';
import { IUserWorkData, IUserWorkDelete, Task } from 'src/store/tasks';
import { StartForm } from './StartForm';
import { TimerListItemText } from './TimerListItemText';
import { UserWorkTable } from './UserWorkTable';

export interface IState {
  open: any;
  page: number;
}

export interface IDashboardProps extends RouteComponentProps<{}> {
  filteredTasks: Task[];
  classes: any;
  currentUserWorkId?: number | string;
  getAllTasks: any;
  getProjectById: (id: number | string) => Project;
  startUserWork: (data: IUserWorkData) => any;
  stopUserWork: (data: IUserWorkDelete) => any;
}

export class DashboardJsx extends React.PureComponent<IDashboardProps, IState> {
  public state = {
    open: {},
    page: 0,
  };

  public componentDidMount() {
    this.props.getAllTasks();
  }

  public render() {
    const { filteredTasks } = this.props;
    const { page } = this.state;
    return (
      <Page>
        <StartForm />
        {filteredTasks &&
          !!filteredTasks.length && (
            <List>{filteredTasks.slice(page * 5, (page + 1) * 5).map(this.renderListItem)}</List>
          )}
        {filteredTasks &&
          !!filteredTasks.length && (
            <TablePagination
              component="div"
              count={filteredTasks.length}
              rowsPerPage={5}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              labelRowsPerPage={'Элементов на странице'}
              labelDisplayedRows={this.labelDisplayedRows}
            />
          )}
      </Page>
    );
  }

  private renderListItem = (task: Task) => {
    const { id, projectId, title, duration, durationInSeconds, source, userWorks } = task;
    const { classes, currentUserWorkId, getProjectById } = this.props;
    const currentUserWork = userWorks.find(el => el.id === currentUserWorkId);
    return [
      <ListItem key={id}>
        <ListItemIcon>
          <StartStopBtn
            isStarted={!!currentUserWork}
            onStart={this.startUserTask(task)}
            onStop={currentUserWork && this.stopUserWork(currentUserWork.id, task.id, projectId)}
          />
        </ListItemIcon>
        <ListItemText primary={title} className={classes.title} />
        <ListItemText primary={getProjectById(projectId).title} className={classes.project} />
        {currentUserWork ? (
          <ListItemText
            secondary={
              <TimerListItemText
                isOpen={this.state.open[id]}
                onClick={this.expandListItem(id)}
                duration={durationInSeconds}
                initial={currentUserWork.durationInSeconds}
              />
            }
            className={classes.duration}
          />
        ) : (
          <ListItemText
            secondary={
              <Tooltip
                placement={'right'}
                title={this.state.open[id] ? 'Закрыть подробности' : 'Нажмите, чтоб раскрыть подробности'}
              >
                <Button onClick={this.expandListItem(id)}>{duration}</Button>
              </Tooltip>
            }
            className={classes.duration}
          />
        )}
        {source && (
          <Tooltip title="Перейти на внешний ресурс" placement="left">
            <ListItemSecondaryAction>
              <IconButton aria-label="Link to external source" href={source} target="_blank">
                <LinkIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </Tooltip>
        )}
      </ListItem>,
      <Collapse
        key={`collapse-${id}`}
        in={this.state.open[id]}
        timeout="auto"
        unmountOnExit
        className={classes.collapse}
      >
        <UserWorkTable userWorks={userWorks} taskId={id} projectId={projectId} />
      </Collapse>,
    ];
  };

  private expandListItem = (id: number | string) => (event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState(({ open }) => ({ open: { [id]: !open[id] } }));
  };

  private startUserTask = ({ id, projectId }: Task) => (event: React.SyntheticEvent) => {
    event.stopPropagation();
    this.setState({ open: { [id]: true } });
    this.props.startUserWork({
      projectId,
      taskId: id,
    });
  };

  private stopUserWork = (userWorkId: number | string | undefined, taskId: number | string, projectId: number) => (
    event: React.SyntheticEvent
  ) => {
    event.stopPropagation();
    this.setState({ open: { [taskId]: false } });
    if (typeof userWorkId === 'number') {
      this.props.stopUserWork({
        projectId,
        taskId,
        userWorkId,
      });
    } else {
      console.log('deleteUserWork taskId type is %s', typeof projectId);
    }
  };

  private labelDisplayedRows = ({ from, to, count }: any) => {
    return ''
      .concat(from, '-')
      .concat(to, ' из ')
      .concat(count);
  };

  private handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number = 0) => {
    this.setState({ page });
  };
}
