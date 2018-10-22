import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Table } from 'src/domains/@common/Table';
import { DownloadList } from 'src/store/@common/entities';
import { Task } from 'src/store/projects';
import { AddTaskForm } from './AddTaskForm';
import { PerformersCell } from './PerformersCell';

export interface IProjectTasksProps {
  classes: any;
  closeDialog: any;
  deleteProjectTask: (id: number) => void;
  openDialog: any;
  projectTasks: DownloadList<Task>;
}

export interface IState {
  page: number | string;
  perPage: number | string;
  selectedUsers: any;
}

export class ProjectTasksJsx extends React.Component<RouteComponentProps<{}> & IProjectTasksProps, IState> {
  public state = {
    page: 0,
    perPage: 10,
    selectedUsers: [],
  };

  private performersCellRef: HTMLElement[] = [];

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

  private renderItem = ({ id, title, description, value, users }: Task) => {
    const { classes } = this.props;
    return (
      <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
        <TableCell>{title}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <span ref={this.setPerformersCellRef(id)}>
            <PerformersCell value={users} taskId={id} />
          </span>
        </TableCell>
        <TableCell numeric>{value}</TableCell>
        <TableCell numeric>
          <IconButton onClick={this.handleRemoveClick(id)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  private setPerformersCellRef = (id: number): any => (node: HTMLElement) => {
    if (node) {
      this.performersCellRef[id] = node;
    }
  };

  private createTask = () => this.props.openDialog(AddTaskForm);

  private handleRowClick = (id: number | undefined) => (event: React.MouseEvent) => {
    let isInside = false;
    if (this.performersCellRef.length) {
      this.performersCellRef.map((cell: HTMLElement) => {
        if (cell.contains(event.target as Node)) {
          isInside = true;
        }
      });
    }
    if (!isInside) {
      console.log('row click', id);
    }
  };

  private handleRemoveClick = (id: number | undefined) => (e: any) => {
    if (typeof id === 'number') {
      e.stopPropagation();
      this.props.deleteProjectTask(id);
    }
  };
}
