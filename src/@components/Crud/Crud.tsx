import React, { useCallback, useMemo } from 'react';

import get from 'lodash/get';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import DeleteIcon from '@material-ui/icons/Delete';

import TableHead from './TableHead';
import TableToolbar from './TableToolbar';
import ConfirmationModal from '../ConfirmationModal';
import CreateForm from './CreateForm';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    row: {
      cursor: 'pointer',
    },
    rowRoot: {
      '&$rowSelected': {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    rowSelected: {},
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
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

export interface ICrudProps {
  closeDialog: any;
  columns: Array<{ title: string; path: any; name?: string; isNumber?: boolean; disablePadding?: boolean }>;
  createItem: any;
  deleteBulk?: (ids: Array<number | string>) => any;
  deleteItem: (id: number) => void;
  entityName: string;
  formName: string;
  getId?: (item) => number | string;
  openDialog: any;
  rows: any[];
}

const defGetId = i => i.id;

export const CrudJsx: React.FC<ICrudProps> = ({
  closeDialog,
  columns,
  createItem,
  deleteItem,
  deleteBulk,
  entityName,
  formName,
  getId = defGetId,
  openDialog,
  rows,
}) => {
  const classes = useStyles();

  const [order, setOrder] = React.useState<Order>('asc');

  const [orderBy, setOrderBy] = React.useState<any>('calories');

  const [selected, setSelected] = React.useState<Array<string | number>>([]);

  const [page, setPage] = React.useState(0);

  const [dense, setDense] = React.useState(false);

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

        const handleConfirm = () => deleteItem(getId(item));
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
    [entityName, getId, deleteItem, openDialog]
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
    openDialog(<CreateForm form={formName} onSubmit={createItem} columns={columns} onSubmitSuccess={closeDialog} />, {
      maxWidth: 'lg',
    });
  }, [closeDialog, createItem, formName, columns, openDialog]);

  if (!Array.isArray(rows)) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
          createItem={createItem ? handleOpenCreate : undefined}
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
                      {columns.map(({ path, name, isNumber }) => (
                        <TableCell key={`${elId}-${name || path}`} align={isNumber ? 'right' : 'left'}>
                          {get(item, path)}
                        </TableCell>
                      ))}
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
};
