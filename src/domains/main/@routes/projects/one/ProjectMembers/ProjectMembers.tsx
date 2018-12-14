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
import { ChangedCell } from './ChangedCell';

export interface IProjectMembersProps {
  classes: any;
  closeDialog: any;
  deleteProjectMember: (id: number) => void;
  openDialog: any;
  projectMembers: Member[];
}

export interface IState {
  page: number | string;
  perPage: number | string;
}

export class ProjectMembersJsx extends React.Component<RouteComponentProps<{}> & IProjectMembersProps, IState> {
  state = {
    page: 0,
    perPage: 10,
  };

  handleRowClick = (id: number | undefined) => () => {
    console.log('row click', id);
  };

  handleRemoveClick = (id: number | undefined) => (e: any) => {
    if (typeof id === 'number') {
      e.stopPropagation();
      this.props.deleteProjectMember(id);
    }
  };

  handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number = 0) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => {
    if (event && event.target.value) {
      this.setState({ perPage: event.target.value });
    }
  };

  render() {
    const { classes, projectMembers } = this.props;
    const { page, perPage } = this.state;
    return (
      <div className={classes.root}>
        {projectMembers && projectMembers.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ползователь</TableCell>
                <TableCell>Активен</TableCell>
                <TableCell numeric>Уровень доступа</TableCell>
                <TableCell numeric />
              </TableRow>
            </TableHead>
            <TableBody>
              {projectMembers
                .slice(page * perPage, (page + 1) * perPage)
                .map(({ accessLevel, member: { id, email } }) => {
                  return (
                    <TableRow className={classes.row} key={email} hover onClick={this.handleRowClick(id)}>
                      <TableCell component="th" scope="row">
                        {email}
                      </TableCell>
                      <TableCell>{accessLevel ? 'Да' : 'Нет'}</TableCell>
                      <TableCell numeric>
                        <ChangedCell title={'Уровень доступа'} input={{ value: [accessLevel] }} memberId={id} />
                      </TableCell>
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
        <AddMemberForm />
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
