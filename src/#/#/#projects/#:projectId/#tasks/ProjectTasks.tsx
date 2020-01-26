import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Table } from '@components/Table';
import { PatchTaskForm } from '#/@common/TaskForm';
import { DownloadList } from '#/@store/@common/entities';
import { PerformersCell } from './PerformersCell';

import { EDIT_TASK_FORM, Task } from '#/@store/tasks';

export interface IProjectTasksProps {
  isFormMount: boolean;
  classes: any;
  closeDialog: any;
  deleteProjectTask: ({ projectId, sequenceNumber }: { projectId: number; sequenceNumber: number }) => void;
  destroy: (formName: string) => any;
  fetchProjectTasks: (p: number) => void;
  openDialog: any;
  projectId: number;
  projectTasks: DownloadList<Task>;
  push: any;
}

export interface IState {
  page: number | string;
  perPage: number | string;
}

export class ProjectTasksJsx extends React.Component<RouteComponentProps<{}> & IProjectTasksProps, IState> {
  state = {
    page: 0,
    perPage: 10,
  };

  private performersCellRef: HTMLElement[] = [];

  componentDidMount() {
    this.props.fetchProjectTasks(this.props.projectId);
  }

  componentWillReceiveProps(nextProps: IProjectTasksProps) {
    if (nextProps.projectId !== this.props.projectId) {
      nextProps.fetchProjectTasks(this.props.projectId);
    }
  }

  componentWillUnmount() {
    if (this.props.isFormMount) {
      this.props.destroy(EDIT_TASK_FORM);
    }
  }

  render() {
    const { classes, projectId, projectTasks } = this.props;
    return (
      <div className={classes.root}>
        {projectTasks && projectTasks.length ? (
          <Table items={projectTasks} renderItem={this.renderItem as any}>
            <TableHead>
              <TableRow>
                <TableCell>Задача</TableCell>
                <TableCell>Исполнители</TableCell>
                <TableCell align="right">Значимость</TableCell>
                <TableCell align="right">Время</TableCell>
                <TableCell align="right">Статус</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
          </Table>
        ) : (
          <Grid item xs={12}>
            Добавьте первую задачу...
          </Grid>
        )}
        <Button size="large" variant="outlined" color="primary" onClick={this.createTask(projectId)}>
          <Typography variant="caption" noWrap>
            {'Добавить задачу'}
          </Typography>
        </Button>
      </div>
    );
  }

  private renderItem = ({
    sequenceNumber,
    title,
    description,
    source,
    status,
    value,
    users,
    duration,
    projectId,
  }: Task) => {
    const { classes } = this.props;
    return (
      <TableRow
        key={sequenceNumber}
        className={classes.row}
        hover
        onClick={this.handleRowClick(sequenceNumber, projectId)}
      >
        <TableCell>{title}</TableCell>
        <TableCell>
          <span ref={this.setPerformersCellRef(sequenceNumber)}>
            <PerformersCell input={{ value: users }} sequenceNumber={sequenceNumber} />
          </span>
        </TableCell>
        <TableCell align="right">{value}</TableCell>
        <TableCell align="right">{duration}</TableCell>
        <TableCell align="right">{status}</TableCell>
        <TableCell align="right">
          <IconButton onClick={this.handleRemoveClick(sequenceNumber)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  private setPerformersCellRef = (sequenceNumber: number | string): any => (node: HTMLElement) => {
    if (node) {
      this.performersCellRef[sequenceNumber] = node;
    }
  };

  private createTask = (projectId: number | string) => () => {
    this.props.openDialog(<PatchTaskForm projectId={projectId} />, { maxWidth: 'lg' });
  };

  private handleRowClick = (sequenceNumber: number | string, projectId: number | string) => (
    event: React.MouseEvent
  ) => {
    let isInside = false;
    if (this.performersCellRef.length) {
      this.performersCellRef.forEach((cell: HTMLElement) => {
        if (cell.contains(event.target as Node)) {
          isInside = true;
        }
      });
    }
    if (!isInside && sequenceNumber) {
      this.props.push({
        pathname: `/projects/${projectId}/tasks/${sequenceNumber}`,
        state: {
          modal: true,
          projectId,
          sequenceNumber,
        },
      });
    }
  };

  private handleRemoveClick = (sequenceNumber: number | string) => (e: any) => {
    if (typeof sequenceNumber === 'number') {
      e.stopPropagation();
      this.props.deleteProjectTask({ projectId: this.props.projectId, sequenceNumber });
    }
  };
}
