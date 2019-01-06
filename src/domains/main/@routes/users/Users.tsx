import { green, orange, red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import get from 'lodash-es/get';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Select from 'src/components/Select';
import { LayoutLeftDrawer } from 'src/domains/@common/LayoutLeftDrawer';
import { IUser } from 'src/store/users';

export interface IUsersProps {
  classes: any;
  deleteUser: any;
  findUserById: (id: number) => IUser;
  fetchUsers: any;
  patchUser: (data: { user: IUser; role: string }) => void;
  userList: IUser[];
}

export interface IState {
  page: number | string;
  perPage: number | string;
}

export class Users extends React.Component<RouteComponentProps<{}> & IUsersProps, IState> {
  state = {
    page: 0,
    perPage: 10,
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  // TODO: cover with tests!!!
  handleRowClick = (id: number | undefined) => (event: React.MouseEvent) => {
    const isOpener = get(event, 'target.dataset.role') === 'opener';
    if (isOpener) {
      return;
    }
  };

  handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.deleteUser(id);
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
    const { classes, userList } = this.props;
    const { page, perPage } = this.state;
    return (
      <LayoutLeftDrawer>
        {userList && userList.length ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell numeric>Статус</TableCell>
                <TableCell className={classes.cell} numeric>
                  Способ получения средств
                </TableCell>
                <TableCell className={classes.cell}>Роль</TableCell>
                <TableCell style={{ width: 42 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .slice(page * perPage, (page + 1) * perPage)
                .map(({ id, email, tel, status, paymentMethod, role }) => {
                  return (
                    <TableRow className={classes.row} key={id} hover onClick={this.handleRowClick(id)}>
                      <TableCell component="th" scope="row">
                        {email}
                      </TableCell>
                      <TableCell>{tel}</TableCell>
                      <TableCell numeric>{status}</TableCell>
                      <TableCell className={classes.cell} numeric>
                        {paymentMethod}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <Select
                          autoWidth
                          renderValue={this.renderSelectValue}
                          IconComponent={this.renderEmpty}
                          onChange={this.handleRoleChange(id)}
                          value={role}
                        >
                          <MenuItem value={'user'}>User</MenuItem>
                          <MenuItem value={'admin'}>Admin</MenuItem>
                          <MenuItem value={'super-admin'}>Super-Admin</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
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
                  count={userList.length}
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
            <img src={'/#'} />
          </Grid>
        )}
      </LayoutLeftDrawer>
    );
  }

  private handleRoleChange = (id?: number) => (e: React.ChangeEvent<{ value: string }>) => {
    e.stopPropagation();
    if (typeof id === 'number') {
      const user = this.props.findUserById(id);
      if (!user) {
        throw new Error(`Пользователь с id ${id} не был найден`);
      }
      this.props.patchUser({ user, role: e.target.value });
    }
  };

  private renderEmpty() {
    return null;
  }

  private renderSelectValue(value: string) {
    const colors = {
      admin: orange['500'],
      user: green['500'],
      ['super-admin']: red.A700,
    };
    return (
      <div data-role={'opener'} style={{ backgroundColor: colors[value] }}>
        {value}
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
