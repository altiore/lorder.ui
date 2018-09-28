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

import { Member } from 'src/store/projects/members/Member';
import { AddMemberForm } from './AddMemberForm';

export interface IProjectMembersProps {
  classes: any;
  closeDialog: any;
  deleteProjectMember: (id: number) => void;
  openDialog: any;
  projectMembers: Member[];
}

export class ProjectMembersJsx extends React.Component<RouteComponentProps<{}> & IProjectMembersProps, {}> {
  public handleRowClick = (id: number | undefined) => () => {
    console.log('row click', id);
  };

  public handleRemoveClick = (id: number | undefined) => (e: any) => {
    if (typeof id === 'number') {
      e.stopPropagation();
      this.props.deleteProjectMember(id);
    }
  };

  public handleChangePage = (...args: any[]) => {
    // console.log('handleChangePage', args);
  };

  public handleChangeRowsPerPage = (...args: any[]) => {
    console.log('handleChangeRowsPerPage', args);
  };

  public render() {
    const { classes, projectMembers } = this.props;
    return (
      <div>
        {projectMembers && projectMembers.length ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Ползователь</TableCell>
                <TableCell>Активен</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell numeric>Уровень доступа</TableCell>
                <TableCell numeric />
              </TableRow>
            </TableHead>
            <TableBody>
              {projectMembers.slice(0, 10).map(({ status, accessLevel, member: { id, role, email } }) => {
                return (
                  <TableRow className={classes.row} key={email} hover onClick={this.handleRowClick(id)}>
                    <TableCell component="th" scope="row">
                      {email}
                    </TableCell>
                    <TableCell>{status ? 'Да' : 'Нет'}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell numeric>{accessLevel}</TableCell>
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
                  count={projectMembers.length}
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
        <AddMemberForm />
      </div>
    );
  }
}
