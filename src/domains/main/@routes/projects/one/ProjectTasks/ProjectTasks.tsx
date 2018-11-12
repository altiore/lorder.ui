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

import { Table } from 'src/components/Table/index';
import { DownloadList } from 'src/store/@common/entities/index';
import { ProjectTask } from 'src/store/projects/index';
import { PerformersCell } from './PerformersCell/index';
import { AddTaskForm, PatchTaskForm } from './TaskForm/index';

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
  public state = {
    page: 0,
    perPage: 10,
  };

  private performersCellRef: HTMLElement[] = [];

  public componentDidMount() {
    this.props.getAllProjectTasks();
  }

  public componentWillReceiveProps(nextProps: IProjectTasksProps) {
    if (nextProps.projectId !== this.props.projectId) {
      nextProps.getAllProjectTasks();
    }
  }

  public componentWillUnmount() {
    if (this.props.isFormMount) {
      this.props.destroyEditTaskForm();
    }
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
                <TableCell>Ссылка на ресурс</TableCell>
                <TableCell>Исполнители</TableCell>
                <TableCell numeric>Значимость</TableCell>
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

  private renderItem = ({ id, title, description, source, value, users, duration }: ProjectTask) => {
    const { classes } = this.props;
    return (
      <TableRow key={id} className={classes.row} hover onClick={this.handleRowClick(id)}>
        <TableCell>{title}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <a href={source} target="_blank">
            {source}
          </a>
        </TableCell>
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
    if (!isInside && id) {
      this.props.openDialog(<PatchTaskForm taskId={id} buttonText="Сохранить" closeDialog={this.props.closeDialog} />);
    }
  };

  private handleRemoveClick = (id: number | string) => (e: any) => {
    if (typeof id === 'number') {
      e.stopPropagation();
      this.props.deleteProjectTask(id);
    }
  };
}
