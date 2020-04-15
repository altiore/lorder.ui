import React, { useCallback, useMemo } from 'react';

import get from 'lodash/get';
import invert from 'lodash/invert';

import Checkbox from '@material-ui/core/Checkbox';
import { DialogProps } from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmationModal from '../ConfirmationModal';
import CreateForm from './CreateForm';
import TableHead from './TableHead';
import TableToolbar from './TableToolbar';

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

function filterEnum(t: any) {
  return isNaN(parseInt(t, 0));
}

const defSelected = [];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  disablePadding?: boolean;
  allowed?: object;
  multiple?: boolean;
  editable?: boolean;
  skip?: (item) => boolean;
}

export interface ICrudProps<IItem = {}> {
  closeDialog: any;
  columns: ICrudColumn[];
  createItem?: any;
  deleteBulk?: (ids: Array<number | string>) => any;
  deleteItem: (id: number) => void;
  editItem?: (itemId, item: Partial<IItem>) => any;
  entityName: string;
  formName: string;
  getId?: (item: IItem) => number | string;
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
    formName,
    getId = defGetId,
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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rows.map(getId);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (id: number | string) => (event: React.MouseEvent<unknown>) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: Array<number | string> = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }

      setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 0));
      setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const labelDisplayedRows = useCallback(({ from, to, count }: any) => {
      return ''
        .concat(from, '-')
        .concat(to, ' из ')
        .concat(count);
    }, []);

    const handleRemoveClick = useCallback(
      (item: any) => (e: any) => {
        if (item) {
          e.stopPropagation();

          const handleConfirm = () => deleteItem(useId ? getId(item) : item);
          openDialog(
            <ConfirmationModal
              onConfirm={handleConfirm}
              titleText={`Удалить ${entityName} "${item.name || item.title || getId(item)}" из проетка?`}
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
              titleText={`Удалить ${selected.length} ${entityName} из проетка?`}
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
      openDialog(
        <CreateForm
          form={formName}
          onSubmit={createItem}
          columns={columns}
          onSubmitSuccess={closeDialog}
          createTitle={createTitle}
        />,
        {
          maxWidth: 'md',
        }
      );
    }, [closeDialog, createItem, createTitle, formName, columns, openDialog]);

    const handleChangeField = (event: any, child) => {
      event.stopPropagation();
      if (editItem) {
        editItem(child.props['data-id'], {
          [event.target.name]: event.target.value,
        });
      }
    };

    const handleCloseSelect = useCallback((event: any) => {
      event.stopPropagation();
    }, []);

    if (!Array.isArray(rows)) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableToolbar
            createItem={createItem ? handleOpenCreate : undefined}
            createTitle={createTitle}
            entityName={entityName}
            numSelected={selected.length}
            deleteBulk={handleDeleteBulk}
          />
          <TableContainer>
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
                        onClick={handleClick(elId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={elId}
                        selected={isItemSelected}
                        className={classes.row}
                        classes={{ root: classes.rowRoot, selected: classes.rowSelected }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            color="primary"
                          />
                        </TableCell>
                        {columns.map(({ allowed, editable, name, path, isNumber, multiple, skip }) => {
                          const value = get(item, path);
                          const labelValue = allowed ? allowed[value] : value;
                          return (
                            <TableCell key={`${elId}-${name || path}`} align={isNumber ? 'right' : 'left'}>
                              {allowed && editItem && editable && (!skip || !skip(item)) ? (
                                <Select
                                  className={classes.select}
                                  name={name || path}
                                  value={value}
                                  multiple={multiple}
                                  onChange={handleChangeField}
                                  onClose={handleCloseSelect}
                                  // tslint:disable
                                  renderValue={s =>
                                    multiple
                                      ? ((s as any) || defSelected).map(e => invert(allowed)[e as any]).join(', ')
                                      : allowed[s as string]
                                  }
                                  // tslint:enable
                                >
                                  {Object.keys(allowed)
                                    .filter(filterEnum)
                                    .map(key => {
                                      const selected = multiple
                                        ? ((value as any) || []).includes(allowed[key])
                                        : value === allowed[key];
                                      return (
                                        <MenuItem
                                          data-id={elId}
                                          selected={selected}
                                          key={allowed[key]}
                                          value={allowed[key]}
                                        >
                                          {multiple && <Checkbox checked={selected} size="small" color="primary" />}
                                          <ListItemText primary={key} />
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                              ) : (
                                labelValue
                              )}
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
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Плотно" />
      </div>
    );
  }
);
