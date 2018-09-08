import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import get from 'lodash-es/get';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { TaskType } from 'src/store/task-types';
import { TaskTypesForm } from './TaskTypesForm';

export interface IProjectTaskTypesProps {
  classes: any;
  deleteTaskType: any;
  getAllTaskTypes: any;
  getTaskTypeById: any;
  projectTaskTypes: TaskType[];
}

export class ProjectTaskTypesJsx extends React.Component<RouteComponentProps<{}> & IProjectTaskTypesProps, {}> {
  public componentDidMount() {
    this.props.getAllTaskTypes();
  }

  public handleRowClick = (id: number | undefined) => () => {
    console.log('clicked by row with id', id);
  };

  public handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.deleteTaskType(id);
  };

  public handleChangePage = (...args: any[]) => {
    // console.log('handleChangePage 333', args);
  };

  public handleChangeRowsPerPage = (...args: any[]) => {
    console.log('handleChangeRowsPerPage', args);
  };

  public render() {
    const { classes, getTaskTypeById, projectTaskTypes } = this.props;
    return (
      <div className={classes.root}>
        {projectTaskTypes ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell numeric>Количество задач</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectTaskTypes.slice(0, 10).map(({ id }) => {
                return (
                  <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
                    <TableCell component="th" scope="row">
                      {get(getTaskTypeById(id), 'title')}
                    </TableCell>
                    <TableCell numeric>{id}</TableCell>
                    <TableCell>
                      <IconButton onClick={this.handleRemoveClick(id)} style={{ height: 42 }}>
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={projectTaskTypes.length}
                  rowsPerPage={10}
                  page={1}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  // ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
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
}
