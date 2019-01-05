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

import { Table } from 'src/components/Table';
import { AddTaskForm, PatchTaskForm } from 'src/domains/@common/TaskForm';
import { DownloadList } from 'src/store/@common/entities';
import { ProjectTask } from 'src/store/projects';
import { PerformersCell } from './PerformersCell';

export interface IProjectTasksProps {
  isFormMount: boolean;
  classes: any;
  closeDialog: any;
  deleteProjectTask: (id: number) => void;
  destroyEditTaskForm: () => any;
  getAllProjectTasks: () => void;
  openDialog: any;
  projectId: number;
  projectTasks: DownloadList<ProjectTask>;
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
    this.props.getAllProjectTasks();
  }

  componentWillReceiveProps(nextProps: IProjectTasksProps) {
    if (nextProps.projectId !== this.props.projectId) {
      nextProps.getAllProjectTasks();
    }
  }

  componentWillUnmount() {
    if (this.props.isFormMount) {
      this.props.destroyEditTaskForm();
    }
  }

  render() {
    const { classes, projectId, projectTasks } = this.props;
    return (
      <div className={classes.root}>
        {projectTasks && projectTasks.length ? (
          <Table items={projectTasks} renderItem={this.renderItem}>
            <TableHead>
              <TableRow>
                <TableCell>Задача</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Ссылка на ресурс</TableCell>
                <TableCell>Исполнители</TableCell>
                <TableCell numeric>Значимость</TableCell>
                <TableCell numeric>Время</TableCell>
                <TableCell numeric>Статус</TableCell>
                <TableCell numeric />
              </TableRow>
            </TableHead>
          </Table>
        ) : (
          <Grid item xs={12}>
            Добавьте первую задачу...
          </Grid>
        )}
        <Button size="large" variant="contained" color="primary" onClick={this.createTask(projectId)}>
          <Typography variant="caption" noWrap>
            {'Добавить задачу'}
          </Typography>
        </Button>
      </div>
    );
  }

  private renderItem = ({ id, title, description, source, status, value, users, duration, projectId }: ProjectTask) => {
    const { classes } = this.props;
    return (
      <TableRow key={id} className={classes.row} hover onClick={this.handleRowClick(id, projectId)}>
        <TableCell>{title}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <a href={source} target="_blank">
            {source}
          </a>
        </TableCell>
        <TableCell>
          <span ref={this.setPerformersCellRef(id)}>
            <PerformersCell input={{ value: users }} taskId={id} />
          </span>
        </TableCell>
        <TableCell numeric>{value}</TableCell>
        <TableCell numeric>{duration}</TableCell>
        <TableCell numeric>{status}</TableCell>
        <TableCell numeric>
          <IconButton onClick={this.handleRemoveClick(id)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  private setPerformersCellRef = (id: number | string): any => (node: HTMLElement) => {
    if (node) {
      this.performersCellRef[id] = node;
    }
  };

  private createTask = (projectId: number | string) => () => {
    this.props.openDialog(<AddTaskForm buttonText="Добавить задачу" projectId={projectId} />, { maxWidth: 'lg' });
  };

  private handleRowClick = (id: number | string, projectId: number | string) => (event: React.MouseEvent) => {
    let isInside = false;
    if (this.performersCellRef.length) {
      this.performersCellRef.map((cell: HTMLElement) => {
        if (cell.contains(event.target as Node)) {
          isInside = true;
        }
      });
    }
    if (!isInside && id) {
      this.props.openDialog(<PatchTaskForm taskId={id} projectId={projectId} buttonText="Сохранить" />, {
        maxWidth: 'lg',
      });
    }
  };

  private handleRemoveClick = (id: number | string) => (e: any) => {
    if (typeof id === 'number') {
      e.stopPropagation();
      this.props.deleteProjectTask(id);
    }
  };
}
