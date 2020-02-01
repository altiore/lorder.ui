import React, { useCallback, useState } from 'react';

import get from 'lodash/get';

import Button from '@material-ui/core/Button';
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

import ConfirmationModal from '@components/ConfirmationModal';
import CreateForm from './CreateForm';
import { useStyles } from './styles';

export interface ICrudProps {
  entityName: string;
  createItem: any;
  deleteItem: (id: number) => void;
  openDialog: any;
  closeDialog: any;
  items: any[];
  rows: Array<{ title: string; path: any; name?: string; isNumber?: boolean }>;
  getId?: (item) => number | string;
}

const defGetId = i => i.id;

export const CrudJsx: React.FC<ICrudProps> = ({
  closeDialog,
  createItem,
  deleteItem,
  entityName,
  getId = defGetId,
  items,
  openDialog,
  rows,
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);

  const [perPage, setPerPage] = useState(10);

  const handleRemoveClick = useCallback(
    (id: number | undefined) => (e: any) => {
      if (typeof id === 'number') {
        e.stopPropagation();

        const handleConfirm = () => deleteItem(id);
        openDialog(
          <ConfirmationModal
            onConfirm={handleConfirm}
            titleText={`Удалить ${entityName} из проетка?`}
            confirmText="Удалить"
            cancelText="Отмена"
          />,
          { maxWidth: 'lg' }
        );
      }
    },
    [entityName, deleteItem, openDialog]
  );

  const handleChangePage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number = 0) => {
      setPage(newPage);
    },
    [setPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => {
      if (event && event.target.value) {
        setPerPage(parseInt(event.target.value, 0));
      }
    },
    []
  );

  const labelDisplayedRows = useCallback(({ from, to, count }: any) => {
    return ''
      .concat(from, '-')
      .concat(to, ' из ')
      .concat(count);
  }, []);

  const handleOpenCreate = useCallback(() => {
    openDialog(
      <CreateForm form={`create${entityName}Form`} onSubmit={createItem} rows={rows} onSubmitSuccess={closeDialog} />,
      { maxWidth: 'lg' }
    );
  }, [closeDialog, createItem, entityName, rows, openDialog]);

  return (
    <div className={classes.root}>
      {createItem && <Button onClick={handleOpenCreate}>Создать</Button>}
      {items && items.length ? (
        <Table>
          <TableHead>
            <TableRow>
              {rows.map(({ title }) => (
                <TableCell key={title}>{title}</TableCell>
              ))}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(page * perPage, (page + 1) * perPage).map((item: any) => {
              return (
                <TableRow className={classes.row} key={getId(item)} hover>
                  {rows.map(({ title, path }) => (
                    <TableCell key={`${getId(item)}.${title}`}>{get(item, path)}</TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton onClick={handleRemoveClick(getId(item))}>
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
                count={items.length}
                rowsPerPage={perPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage={'Элементов на странице'}
                labelDisplayedRows={labelDisplayedRows}
              />
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <Grid item xs={12}>
          ...loading
        </Grid>
      )}
    </div>
  );
};
