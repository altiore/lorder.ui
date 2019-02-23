import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import get from 'lodash-es/get';
import * as moment from 'moment';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TableCellProps } from 'react-virtualized';

import { IUser } from 'src/@types';
import { Page } from 'src/components/Page';
import TableVirtualized, { ColumnType } from 'src/components/TableVirtualized';
import { LayoutLeftDrawer } from 'src/domains/@common/LayoutLeftDrawer';

export interface IUsersProps {
  classes: any;
  deleteUser: any;
  findUserById: any;
  fetchUsers: any;
  getRef: React.RefObject<{}>;
  patchUser: any;
  userList: IUser[];
  height: number;
  isWidthSm: boolean;
  theme: Theme;
}

export interface IUsersState {
  sortBy: number | string;
  sortDirection: string;
}

export class Users extends React.Component<RouteComponentProps<{}> & IUsersProps, IUsersState> {
  state = {
    sortBy: 'email',
    sortDirection: 'ASC',
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

  render() {
    const { isWidthSm, getRef, userList } = this.props;
    let columns: ColumnType[] = [
      { label: `Email (${userList.length})`, order: 1, isShown: true, dataKey: 'email' },
      { label: '', order: 7, isShown: true, dataKey: 'id', component: this.renderRemove, width: 100 },
    ];
    if (!isWidthSm) {
      columns = columns.concat([
        { label: 'Создан', order: 2, isShown: true, dataKey: 'createdAt', component: this.renderCreatedAt },
        { label: 'Телефон', order: 3, isShown: true, dataKey: 'tel' },
        { label: 'Статус', order: 4, isShown: true, dataKey: 'status', width: 130 },
        { label: 'Роль', order: 5, isShown: true, dataKey: 'role', component: this.renderSelectRole, width: 190 },
        { label: 'Проектов', order: 6, isShown: true, dataKey: 'projectsCount', width: 230 },
      ]);
    }
    const rows = userList.sort(this.sortState());
    const { sortBy, sortDirection } = this.state;
    return (
      <LayoutLeftDrawer>
        <Page innerRef={getRef}>
          <TableVirtualized
            columns={columns}
            rows={rows}
            height={'calc(100% - 40px)'}
            sort={this.sortTable}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
        </Page>
      </LayoutLeftDrawer>
    );
  }

  private renderSelectRole = ({ cellData, rowData }: TableCellProps) => (
    <Select
      autoWidth
      IconComponent={this.renderEmpty}
      onChange={this.handleRoleChange(rowData.id)}
      value={cellData}
      input={<OutlinedInput labelWidth={0} />}
    >
      <MenuItem value={'user'}>User</MenuItem>
      <MenuItem value={'admin'}>Admin</MenuItem>
      <MenuItem value={'super-admin'}>Super-Admin</MenuItem>
    </Select>
  );

  private renderCreatedAt = ({ cellData }: TableCellProps) => <span>{moment(cellData).format('DD MMM YYYY')}</span>;

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

  private renderRemove = ({ cellData }: TableCellProps) => (
    <Fab size="small" color="primary" onClick={this.handleRemoveClick(cellData)}>
      <ClearIcon />
    </Fab>
  );

  private sortTable = ({ sortBy, sortDirection }: any) => {
    this.setState({ sortBy, sortDirection });
  };

  private sortState = (): ((a: any, b: any) => number) => {
    const { sortBy } = this.state;
    return (a: IUser, b: IUser) => this.getSortFunctionFromDirection(a[sortBy], b[sortBy]);
  };

  private getSortFunctionFromDirection = (a: any, b: any) => {
    const { sortDirection } = this.state;
    if (sortDirection === 'ASC') {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  };
}
