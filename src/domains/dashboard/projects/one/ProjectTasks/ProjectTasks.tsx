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
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Task } from 'src/store/projects';
import { AddTaskForm } from './AddTaskForm';

export interface IProjectTasksProps {
  classes: any;
  closeDialog: any;
  deleteProjectTask: (id: number) => void;
  openDialog: any;
  projectTasks: Task[];
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

  public handleRowClick = (id: number | undefined) => () => {
    console.log('row click', id);
  };

  public handleRemoveClick = (id: number | undefined) => (e: any) => {
    if (typeof id === 'number') {
      e.stopPropagation();
      this.props.deleteProjectTask(id);
    }
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
    const { classes, projectTasks } = this.props;
    const { page, perPage } = this.state;
    return (
      <div>
        {projectTasks && projectTasks.length ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Задача</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell numeric>Стоимость</TableCell>
                <TableCell numeric />
              </TableRow>
            </TableHead>
            <TableBody>
              {projectTasks.slice(page * perPage, (page + 1) * perPage).map(({ id, title, description, value }) => {
                return (
                  <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
                    <TableCell>{title}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell numeric>{value}</TableCell>
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
                  count={projectTasks.length}
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
        <AddTaskForm />
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
