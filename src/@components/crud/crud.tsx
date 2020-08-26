import React, { useCallback, useEffect, useMemo } from 'react';

import get from 'lodash/get';
import invert from 'lodash/invert';

import Checkbox from '@material-ui/core/Checkbox';
import { DialogProps } from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmationModal from '@components/confirmation-modal';

import CreateForm from './create-form';
import TableHead from './table-head';
import TableToolbar from './table-toolbar';

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const MIN_HEIGHT = 208;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlLabel: {
      marginLeft: 0,
    },
    paper: {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    root: {
      width: '100%',
    },
    row: {
      cursor: 'pointer',
    },
    rowRoot: {
      '&$rowSelected': {
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
        },
        backgroundColor: theme.palette.secondary.main,
      },
    },
    rowSelected: {},
    select: {
      width: '100%',
    },
    table: {
      minWidth: 750,
    },
    tableContainer: {
      minHeight: MIN_HEIGHT,
      ...theme.mainContent.scroll,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

export interface ICrudColumn {
  title: string;
  path: any;
  name?: string;
  isNumber?: boolean;
  isBoolean?: boolean;
  emptyElement?: any;
  allowed?: object;
  editable?: boolean;
  skip?: (item) => boolean;
  component?: (...a: any) => JSX.Element | null;
  fieldComponent?: (...a: any) => JSX.Element | null;
  fieldProps?: any;
}

export interface IColumnComponent {
  value: any;
}

export interface ICrudProps<IItem = {}> {
  closeDialog: any;
  columns: ICrudColumn[];
  createItem?: any;
  deleteBulk?: (ids: Array<number | string>) => any;
  deleteItem?: (id: number) => void;
  editItem?: (itemId, item: Partial<IItem>) => any;
  entityName: string;
  FilterComponent?: React.FC;
  formName?: string;
  getId?: (item: IItem) => number | string;
  height: number;
  openDialog: (el: JSX.Element, props?: Partial<DialogProps>) => void;
  rows: any[];
  createTitle?: string;
  useId?: boolean;
}

const defGetId = i => i.id;

export const CrudJsx: React.FC<ICrudProps> = React.memo(
  ({
    closeDialog,
    columns,
    createItem,
    createTitle = 'Создать',
    deleteItem,
    deleteBulk,
    editItem,
    entityName,
    FilterComponent,
    formName,
    getId = defGetId,
    height,
    openDialog,
    rows,
    useId = true,
  }) => {
    const classes = useStyles();

    const [order, setOrder] = React.useState<Order>('asc');

    const [orderBy, setOrderBy] = React.useState<any>('calories');

    const [selected, setSelected] = React.useState<Array<string | number>>([]);

    const [page, setPage] = React.useState(0);

    const [dense, setDense] = React.useState(true);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const tableHeight = useMemo(() => {
      const calcHeight = height - 300;
      if (calcHeight < MIN_HEIGHT) {
        return MIN_HEIGHT;
      }

      return calcHeight;
    }, [height]);

    useEffect(() => {
      if (tableHeight === MIN_HEIGHT && rowsPerPage !== 5) {
        setRowsPerPage(5);
      }
    }, [rowsPerPage, setRowsPerPage, tableHeight]);

    const rowsLength = useMemo(() => {
      return get(rows, 'length', 0);
    }, [rows]);

    const emptyRows = useMemo(() => {
      return rowsPerPage - Math.min(rowsPerPage, rowsLength - page * rowsPerPage);
    }, [page, rowsPerPage, rowsLength]);

    const handleRequestSort = useCallback(
      (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      },
      [setOrder, setOrderBy, orderBy, order]
    );

    const handleSelectAllClick = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = rows.map(getId);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      },
      [getId, rows]
    );

    const handleCheckClick = useCallback(
      event => {
        event.stopPropagation();
        const targetValue = parseInt(event.currentTarget?.value || event.currentTarget?.dataset?.value, 0);
        let newSelected: Array<number | string> = [];
        const isAlreadySelected = selected.includes(targetValue);
        if (isAlreadySelected) {
          newSelected = selected.filter(id => targetValue !== id);
        } else {
          newSelected = [...selected, targetValue];
        }
        setSelected(newSelected);
      },
      [selected]
    );

    const handleRowClick = useCallback(
      event => {
        event.stopPropagation();
        if (editItem && event.target.tagName === 'TD') {
          const item = rows.find(el => el.id === parseInt(event.currentTarget?.dataset?.value, 0)) || {};
          openDialog(
            <CreateForm
              form={formName}
              onSubmit={editItem}
              columns={columns}
              onSubmitSuccess={closeDialog}
              initialValues={item}
              submitTitle="Изменить"
            />,
            {
              maxWidth: 'md',
            }
          );
        }
      },
      [closeDialog, columns, editItem, formName, openDialog, rows]
    );

    const handleChangePage = useCallback((event: unknown, newPage: number) => {
      setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 0));
      setPage(0);
    }, []);

    const handleChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    }, []);

    const isSelected = useCallback((name: string) => selected.indexOf(name) !== -1, [selected]);

    const labelDisplayedRows = useCallback(({ from, to, count }: any) => {
      return ''
        .concat(from, '-')
        .concat(to, ' из ')
        .concat(count);
    }, []);

    const handleRemoveClick = useCallback(
      (item: any) => (e: any) => {
        if (deleteItem && item) {
          e.stopPropagation();

          const handleConfirm = () => deleteItem(useId ? getId(item) : item);
          openDialog(
            <ConfirmationModal
              onConfirm={handleConfirm}
              titleText={`Удалить ${entityName} "${item.name || item.title || getId(item)}" из проекта?`}
              confirmText="Удалить"
              cancelText="Отмена"
            />,
            { maxWidth: 'lg' }
          );
        }
      },
      [entityName, getId, deleteItem, openDialog, useId]
    );

    const handleDeleteBulk = useCallback(
      (e: any) => {
        if (deleteBulk) {
          e.stopPropagation();

          const handleConfirm = () => deleteBulk(selected);
          openDialog(
            <ConfirmationModal
              onConfirm={handleConfirm}
              titleText={`Удалить ${selected.length} ${entityName} из проекта?`}
              confirmText="Удалить"
              cancelText="Отмена"
            />,
            { maxWidth: 'lg' }
          );
        }
      },
      [entityName, deleteBulk, openDialog, selected]
    );

    const handleOpenCreate = useCallback(() => {
      if (formName) {
        openDialog(
          <CreateForm
            form={formName}
            onSubmit={createItem}
            columns={columns}
            onSubmitSuccess={closeDialog}
            submitTitle={createTitle}
          />,
          {
            maxWidth: 'md',
          }
        );
      }
    }, [closeDialog, createItem, createTitle, formName, columns, openDialog]);

    const handleChangeComponentField = useCallback(
      (elId, event) => {
        event.stopPropagation();
        const value = typeof event.target.checked === 'boolean' ? event.target.checked : event.target.value;
        if (editItem) {
          editItem(elId, {
            [event.target.name]: value,
          });
        }
      },
      [editItem]
    );

    const getChangeFunc = useCallback(
      elId => {
        return handleChangeComponentField.bind(undefined, elId);
      },
      [handleChangeComponentField]
    );

    if (!Array.isArray(rows)) {
      return null;
    }

    return (
      <div className={classes.root}>
        <TableToolbar
          createItem={createItem ? handleOpenCreate : undefined}
          createTitle={createTitle}
          entityName={entityName}
          numSelected={selected.length}
          deleteBulk={handleDeleteBulk}
          FilterComponent={FilterComponent}
        />
        <TableContainer className={classes.tableContainer} style={{ height: tableHeight }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <TableHead
              classes={classes as any}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsLength}
              columns={columns}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  const elId = getId(item);
                  const isItemSelected = isSelected(elId);
                  const labelId = `enhanced-table-checkbox-${elId}`;

                  return (
                    <TableRow
                      hover
                      onClick={handleRowClick}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={elId}
                      data-value={elId}
                      selected={isItemSelected}
                      className={classes.row}
                      classes={{
                        root: classes.rowRoot,
                        selected: classes.rowSelected,
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onChange={handleCheckClick}
                          value={elId}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color="primary"
                        />
                      </TableCell>
                      {columns.map(({ allowed, component, editable, name, path, skip }) => {
                        const value = get(item, path);
                        const labelValue = allowed
                          ? Array.isArray(value)
                            ? value.map(el => invert(allowed)[el]).join(', ')
                            : allowed[value]
                          : value;
                        const isNumber = typeof labelValue === 'number';
                        if (component) {
                          return (
                            <TableCell key={`${elId}-${name || path}`} align={isNumber ? 'right' : 'left'}>
                              {React.createElement(component, {
                                allowed,
                                editable: editItem && editable && (!skip || !skip(item)),
                                name: name || path,
                                onChange: getChangeFunc(elId),
                                value,
                              })}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={`${elId}-${name || path}`} align={isNumber ? 'right' : 'left'}>
                            {labelValue}
                          </TableCell>
                        );
                      })}
                      <TableCell padding="checkbox">
                        <IconButton onClick={handleRemoveClick(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={columns.length + 2} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FormControlLabel
            className={classes.formControlLabel}
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Плотно"
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rowsLength}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage={'Элементов на странице'}
            labelDisplayedRows={labelDisplayedRows}
          />
        </div>
      </div>
    );
  }
);
