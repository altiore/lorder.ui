import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import * as classNames from 'classnames';
import * as React from 'react';
import {
  AutoSizer,
  Column,
  SortDirection,
  Table,
  TableCellRenderer,
  TableHeaderProps,
  TableProps,
} from 'react-virtualized';

interface ColumnType {
  component?: any;
  dataKey: string;
  disableSort?: boolean;
  isShown?: boolean;
  label: string;
  numeric?: boolean;
  order?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  width?: number;
}

type ColumnsType = ColumnType[];

export interface ITableVirtualizedProps extends TableProps {
  buttonAttr?: any;
  classes: any;
  columns: ColumnsType;
  headerHeight: number;
  height: any;
  onRowClick?: (...args: any) => any;
  rowClassName?: string;
  rowHeight: number;
  sort?: (...args: any) => any;
  className?: string;
  rows: any[];
}

export interface ITableVirtualizedState {
  columns: ColumnsType;
}

export class TableVirtualized extends React.Component<ITableVirtualizedProps, ITableVirtualizedState> {
  static defaultProps = {
    className: '',
    headerHeight: 56,
    height: '100%',
    isColumnsSortable: true,
    rowHeight: 56,
  };

  state = {
    columns: this.prepareColumns(this.props),
  };

  componentWillReceiveProps(nextProps: ITableVirtualizedProps) {
    if (this.props.columns !== nextProps.columns) {
      this.setState({ columns: this.prepareColumns(nextProps) });
    }
  }

  render() {
    const { classes, className, height, rows, ...tableProps } = this.props;
    const { columns } = this.state;
    return (
      <div style={{ height, width: '100%' }} className={className}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <Table
                className={classes.table}
                height={height}
                width={width}
                rowCount={rows.length}
                rowGetter={this.rowGetter(rows)}
                {...tableProps}
                rowClassName={this.getRowClassName}
              >
                {columns.map(({ component = null, dataKey, ...other }, index: number) => {
                  let renderer: TableCellRenderer;
                  if (component !== null) {
                    renderer = cellRendererProps =>
                      this.cellRenderer({
                        cellData: React.isValidElement(component)
                          ? React.cloneElement(component, cellRendererProps)
                          : React.createElement(component as any, cellRendererProps),
                        columnIndex: index,
                      });
                  } else {
                    renderer = this.cellRenderer as TableCellRenderer;
                  }

                  return (
                    <Column
                      key={dataKey}
                      headerRenderer={this.wrappedHeaderRender(index)}
                      className={classNames(classes.flexContainer, className)}
                      cellRenderer={renderer}
                      dataKey={dataKey}
                      width={this.calculateColumnWidth(columns, width)}
                      defaultSortDirection="ASC"
                      {...other}
                    />
                  );
                })}
              </Table>
            );
          }}
        </AutoSizer>
      </div>
    );
  }

  // handleChangeColumns = (columns: ColumnsType) => {
  //   this.setState({ columns: [...columns] });
  // };

  rowGetter = (rows: any) => ({ index }: { index: number }) => rows[index];

  getRowClassName = ({ index }: { index: number }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }: { cellData: any; columnIndex: number }) => {
    const { classes, rowHeight, onRowClick } = this.props;
    const { columns } = this.state;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  wrappedHeaderRender = (index: number) => (headerProps: TableHeaderProps) =>
    this.headerRenderer({
      ...headerProps,
      columnIndex: index,
    } as any);

  headerRenderer = ({ columnIndex, dataKey, label, sortBy, sortDirection }: ColumnType & { columnIndex: number }) => {
    const { headerHeight, classes, sort } = this.props;
    const { columns } = this.state;
    const direction: {} = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null && sortDirection ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight || 56 }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  private prepareColumns(props: ITableVirtualizedProps) {
    return props.columns
      .map(el => ({ ...el, isShown: el.isShown !== undefined ? el.isShown : true }))
      .filter(el => el.isShown)
      .sort(
        (a: ColumnType, b: ColumnType) =>
          a.order && b.order ? (a.order > b.order ? 1 : -1) : a.dataKey > b.dataKey ? 1 : -1
      );
  }

  private calculateColumnWidth = (filteredColumns: any[], width: number): number => {
    let restCount = filteredColumns.length;
    const restWidth = filteredColumns.reduce((res: number, cur: any) => {
      if (cur.width) {
        restCount = --restCount;
        return res - cur.width;
      }
      return res;
    }, width);
    if (!restCount) {
      return 88;
    }
    const newWidth = restWidth / restCount;
    if (newWidth < 88) {
      return 88;
    }
    return newWidth;
  };
}
