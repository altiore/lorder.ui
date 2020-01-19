import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import get from 'lodash-es/get';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TableCellProps } from 'react-virtualized';

import { Page } from '@components/Page';
import TableVirtualized from '@components/TableVirtualized';
import { LayoutLeftDrawer } from '@domains/@common/LayoutLeftDrawer';

export interface ITaskTypesProps {
  classes: any;
  deleteTaskType: any;
  findUserById: any;
  getAllTaskTypes: any;
  getRef: React.RefObject<{}>;
  patchUser: any;
  list: any[];
}

export interface ITaskTypesState {
  sortBy: number | string;
  sortDirection: string;
}

export class TaskTypesTsx extends React.Component<RouteComponentProps<{}> & ITaskTypesProps, ITaskTypesState> {
  state = {
    sortBy: 'title',
    sortDirection: 'ASC',
  };

  componentDidMount() {
    this.props.getAllTaskTypes();
  }

  render() {
    const { getRef, list } = this.props;
    const columns = [
      { label: `Название (${list.length})`, order: 1, isShown: true, dataKey: 'title' },
      { label: 'Публичная', order: 2, isShown: true, dataKey: 'isPublic', component: this.renderPublished },
      { label: '', order: 7, isShown: true, dataKey: 'id', component: this.renderRemove, width: 100 },
    ];
    const rows = list.sort(this.sortState());
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

  // TODO: cover with tests!!!
  handleRowClick = (id: number | undefined) => (event: React.MouseEvent) => {
    const isOpener = get(event, 'target.dataset.role') === 'opener';
    if (isOpener) {
      return;
    }
  };

  handleRemoveClick = (id: number | undefined) => (e: any) => {
    e.stopPropagation();
    this.props.deleteTaskType(id);
  };

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
    return (a: any, b: any) => this.getSortFunctionFromDirection(a[sortBy], b[sortBy]);
  };

  private getSortFunctionFromDirection = (a: any, b: any) => {
    const { sortDirection } = this.state;
    if (sortDirection === 'ASC') {
      return a > b ? 1 : -1;
    } else {
      return a < b ? 1 : -1;
    }
  };

  private renderPublished = ({ cellData }: TableCellProps) => {
    return cellData ? 'Да' : 'Нет';
  };
}
