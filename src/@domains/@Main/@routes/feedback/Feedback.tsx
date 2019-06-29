import { Theme } from '@material-ui/core/styles';
import get from 'lodash-es/get';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IUser } from '@types';
import { Page } from '@components/Page';
import TableVirtualized, { ColumnType } from '@components/TableVirtualized';
import { LayoutLeftDrawer } from '@domains/@common/LayoutLeftDrawer';

export interface IFeedbackProps {
  classes: any;
  fetchFeedbackList: any;
  getRef: React.RefObject<{}>;
  feedbackList: any[];
  height: number;
  isWidthSm: boolean;
  theme: Theme;
}

export interface IFeedbackState {
  sortBy: number | string;
  sortDirection: string;
}

export class Feedback extends React.Component<RouteComponentProps<{}> & IFeedbackProps, IFeedbackState> {
  state = {
    sortBy: 'email',
    sortDirection: 'ASC',
  };

  componentDidMount() {
    this.props.fetchFeedbackList();
  }

  // TODO: cover with tests!!!
  handleRowClick = (id: number | undefined) => (event: React.MouseEvent) => {
    const isOpener = get(event, 'target.dataset.role') === 'opener';
    if (isOpener) {
      return;
    }
  };

  render() {
    const { isWidthSm, getRef, feedbackList } = this.props;
    let columns: ColumnType[] = [{ label: `Id (${feedbackList.length})`, order: 1, isShown: true, dataKey: 'id' }];
    if (!isWidthSm) {
      columns = columns.concat([
        { label: 'Имя', order: 2, isShown: true, dataKey: 'name' },
        { label: 'E-mail', order: 3, isShown: true, dataKey: 'email' },
        { label: 'Текст', order: 4, isShown: true, dataKey: 'feedback', width: 230 },
      ]);
    }
    const rows = feedbackList.sort(this.sortState());
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
