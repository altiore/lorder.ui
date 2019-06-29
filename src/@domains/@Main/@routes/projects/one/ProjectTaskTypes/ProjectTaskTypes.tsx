import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import get from 'lodash-es/get';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Table } from '@components/Table';
import { DownloadList } from '@store/@common/entities';
import { TaskType } from '@store/task-types';
import { TaskTypesForm } from './TaskTypesForm';

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
  state = {
    page: 0,
    perPage: 10,
  };

  componentDidMount() {
    this.props.getAllTaskTypes();
    this.props.getAllProjectTaskTypes();
  }

  render() {
    const { classes, projectTaskTypes } = this.props;
    return (
      <div className={classes.root}>
        {projectTaskTypes && projectTaskTypes.length ? (
          <Table items={projectTaskTypes} renderItem={this.renderItem}>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell align="right">Количество задач</TableCell>
                <TableCell align="right" />
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

  private renderItem = ({ id }: any) => {
    const { classes, getTaskTypeById } = this.props;
    return (
      <TableRow className={classes.row} key={id} hover>
        <TableCell component="th" scope="row">
          {get(getTaskTypeById(id), 'title')}
        </TableCell>
        <TableCell align="right">{id}</TableCell>
        <TableCell align="right">
          <IconButton onClick={this.handleRemoveClick(id)}>
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  // private handleRowClick = (id: number | undefined) => () => {
  //   console.log('clicked by row with id', id);
  // };

  private handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.deleteTaskType(id);
  };
}
