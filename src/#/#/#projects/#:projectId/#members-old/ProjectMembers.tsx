import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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

import { Member } from '#/@store/projects/members/Member';

import { AddMemberForm } from './AddMemberForm';
import Select from './Select';
import { useStyles } from './styles';

export interface IProjectMembersProps {
  deleteProjectMember: (id: number) => void;
  openDialog: any;
  projectMembers: Member[];
}

export const ProjectMembersJsx: React.FC<RouteComponentProps<{}> & IProjectMembersProps> = ({
  deleteProjectMember,
  openDialog,
  projectMembers,
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);

  const [perPage, setPerPage] = useState(10);

  const handleRemoveClick = useCallback(
    (id: number | undefined) => (e: any) => {
      if (typeof id === 'number') {
        e.stopPropagation();

        const handleConfirm = () => deleteProjectMember(id);
        openDialog(
          <ConfirmationModal
            onConfirm={handleConfirm}
            titleText="Удалить пользователя из проетка?"
            confirmText="Удалить"
            cancelText="Отмена"
          />,
          { maxWidth: 'lg' }
        );
      }
    },
    [deleteProjectMember, openDialog]
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

  return (
    <div className={classes.root}>
      {projectMembers && projectMembers.length ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Пользователь</TableCell>
              <TableCell>Активен</TableCell>
              <TableCell align="right">Уровень доступа</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {projectMembers
              .slice(page * perPage, (page + 1) * perPage)
              .map(({ accessLevel, member: { id, email } }) => {
                return (
                  <TableRow className={classes.row} key={email} hover>
                    <TableCell component="th" scope="row">
                      {email}
                    </TableCell>
                    <TableCell>{accessLevel ? 'Да' : 'Нет'}</TableCell>
                    <TableCell align="right">
                      <Select value={accessLevel} memberId={id} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={handleRemoveClick(id)}>
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
      <AddMemberForm />
    </div>
  );
};
