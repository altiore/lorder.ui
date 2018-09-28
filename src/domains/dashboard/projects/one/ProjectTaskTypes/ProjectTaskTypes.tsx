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
  }

  public handleRowClick = (id: number | undefined) => () => {
    console.log('clicked by row with id', id);
  };

  public handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.deleteTaskType(id);
  };

  public handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number = 0) => {
    this.setState({ page });
  };

  public handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => {
    if (event && event.target.value) {
      this.setState({ perPage: event.target.value });
    }
  };

  public render() {
    const { classes, getTaskTypeById, projectTaskTypes } = this.props;
    const { page, perPage } = this.state;
    return (
      <div className={classes.root}>
        {projectTaskTypes ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell numeric>Количество задач</TableCell>
                <TableCell numeric />
              </TableRow>
            </TableHead>
            <TableBody>
              {projectTaskTypes.slice(page * perPage, (page + 1) * perPage).map(({ id }) => {
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
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={projectTaskTypes.length}
                  rowsPerPage={perPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  labelRowsPerPage={'Элементов на странице'}
                  labelDisplayedRows={this.labelDisplayedRows}
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

  private labelDisplayedRows = ({ from, to, count }: any) => {
    return ''
      .concat(from, '-')
      .concat(to, ' из ')
      .concat(count);
  };
}
