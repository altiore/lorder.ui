import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import * as Popover from 'react-popover';
import { RouteComponentProps } from 'react-router-dom';

import { Table } from 'src/domains/@common/Table';
import { DownloadList } from 'src/store/@common/entities';
import { ProjectTask } from 'src/store/projects';
import { AddTaskForm } from './AddTaskForm';
import { PatchTaskForm } from './PatchTaskForm';
import { PerformersCell } from './PerformersCell';

export interface IProjectTasksProps {
  classes: any;
  closeDialog: any;
  deleteProjectTask: (id: number) => void;
  destroyEditTaskForm: () => any;
  getAllProjectTasks: () => void;
  openDialog: any;
  projectTasks: DownloadList<ProjectTask>;
}

export interface IState {
  isPopoverOpened: any;
  page: number | string;
  perPage: number | string;
}

export class ProjectTasksJsx extends React.Component<RouteComponentProps<{}> & IProjectTasksProps, IState> {
  public state = {
    isPopoverOpened: {},
    page: 0,
    perPage: 10,
  };

  private performersCellRef: HTMLElement[] = [];

  public componentDidMount() {
    this.props.getAllProjectTasks();
  }

  public componentWillUnmount() {
    this.props.destroyEditTaskForm();
  }

  public render() {
    const { classes, projectTasks } = this.props;
    return (
      <div className={classes.root}>
        {projectTasks && projectTasks.length ? (
          <Table items={projectTasks} renderItem={this.renderItem}>
            <TableHead>
              <TableRow>
                <TableCell>Задача</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Исполнители</TableCell>
                <TableCell numeric>Стоимость</TableCell>
                <TableCell numeric>Время</TableCell>
                <TableCell numeric />
              </TableRow>
            </TableHead>
          </Table>
        ) : (
          <Grid item xs={12}>
            Добавьте первую задачу...
          </Grid>
        )}
        <Button size="large" variant="contained" color="primary" onClick={this.createTask}>
          <Typography variant="caption" noWrap>
            {'Добавить задачу'}
          </Typography>
        </Button>
      </div>
    );
  }

  private renderItem = ({ id, title, description, value, users, duration }: ProjectTask) => {
    const { classes } = this.props;
    return (
      <TableRow key={id} className={classes.row} hover onClick={this.handleRowClick(id)}>
        <Popover
          onOuterAction={this.onOuterAction}
          preferPlace={'right'}
          body={<PatchTaskForm taskId={id} buttonText="Сохранить" closeDialog={this.onOuterAction} />}
          isOpen={this.state.isPopoverOpened[id]}
        >
          <TableCell>{title}</TableCell>
        </Popover>
        <TableCell>{description}</TableCell>
        <TableCell>
          <span ref={this.setPerformersCellRef(id)}>
            <PerformersCell value={users} taskId={id} />
          </span>
        </TableCell>
        <TableCell numeric>{value}</TableCell>
        <TableCell numeric>{duration}</TableCell>
        <TableCell numeric>
          <IconButton onClick={this.handleRemoveClick(id)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  private onOuterAction = () => {
    this.setState({ isPopoverOpened: {} });
  };

  private setPerformersCellRef = (id: number | string): any => (node: HTMLElement) => {
    if (node) {
      this.performersCellRef[id] = node;
    }
  };

  private createTask = () => this.props.openDialog(<AddTaskForm buttonText="Добавить задачу" />);

  private handleRowClick = (id: number | string) => (event: React.MouseEvent) => {
    let isInside = false;
    if (this.performersCellRef.length) {
      this.performersCellRef.map((cell: HTMLElement) => {
        if (cell.contains(event.target as Node)) {
          isInside = true;
        }
      });
    }
    if (!isInside && id && !this.state.isPopoverOpened[id]) {
      this.setState({ isPopoverOpened: { [id]: true } });
    }
  };

  private handleRemoveClick = (id: number | string) => (e: any) => {
    if (typeof id === 'number') {
      e.stopPropagation();
      this.props.deleteProjectTask(id);
    }
  };
}
