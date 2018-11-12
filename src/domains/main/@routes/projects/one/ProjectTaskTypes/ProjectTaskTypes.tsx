import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import get from 'lodash-es/get';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Table } from 'src/components/Table/index';
import { DownloadList } from 'src/store/@common/entities/index';
import { TaskType } from 'src/store/task-types/index';
import { TaskTypesForm } from './TaskTypesForm/index';

export interface IProjectTaskTypesProps {
  classes: any;
  deleteTaskType: any;
  getAllTaskTypes: () => any;
  getAllProjectTaskTypes: () => any;
  getTaskTypeById: any;
  projectTaskTypes: DownloadList<TaskType>;
}

export interface IState {
  page: number | string;
  perPage: number | string;
}

export class ProjectTaskTypesJsx extends React.Component<RouteComponentProps<{}> & IProjectTaskTypesProps, IState> {
  public state = {
    page: 0,
    perPage: 10,
  };

  public componentDidMount() {
    this.props.getAllTaskTypes();
    this.props.getAllProjectTaskTypes();
  }

  public render() {
    const { classes, projectTaskTypes } = this.props;
    return (
      <div className={classes.root}>
        {projectTaskTypes && projectTaskTypes.length ? (
          <Table items={projectTaskTypes} renderItem={this.renderItem}>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell numeric>Количество задач</TableCell>
                <TableCell numeric />
              </TableRow>
            </TableHead>
          </Table>
        ) : (
          <Grid item xs={12}>
            ...loading
          </Grid>
        )}
        <TaskTypesForm />
      </div>
    );
  }

  private renderItem = ({ id }: TaskType) => {
    const { classes, getTaskTypeById } = this.props;
    return (
      <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
        <TableCell component="th" scope="row">
          {get(getTaskTypeById(id), 'title')}
        </TableCell>
        <TableCell numeric>{id}</TableCell>
        <TableCell numeric>
          <IconButton onClick={this.handleRemoveClick(id)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  private handleRowClick = (id: number | undefined) => () => {
    console.log('clicked by row with id', id);
  };

  private handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.deleteTaskType(id);
  };
}
