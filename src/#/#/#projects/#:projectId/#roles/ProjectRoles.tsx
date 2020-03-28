import React, { useCallback, useEffect, useMemo } from 'react';

import get from 'lodash-es/get';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';

import { Table } from '@components/Table';

import { DownloadList } from '#/@store/@common/entities';

import { CreateForm } from './CreateForm';
import { useStyles } from './styles';

export interface IProjectRolesProps {
  deleteProjectRole: any;
  fetchProjectRoles: () => any;
  fetchRoles: () => any;
  getAllProjectTaskTypes: () => any;
  rolesList: DownloadList<any>;
  projectRoles: DownloadList<any>;
}

export const ProjectRolesJsx: React.FC<IProjectRolesProps> = ({
  deleteProjectRole,
  fetchRoles,
  fetchProjectRoles,
  projectRoles,
  rolesList,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchRoles();
    fetchProjectRoles();
  }, [fetchRoles, fetchProjectRoles]);

  const preparedProjectRoles = useMemo(() => {
    return projectRoles.map(item => ({
      ...item,
      role: rolesList.find(el => el.id === item.role),
    }));
  }, [projectRoles, rolesList]);

  const handleRemoveClick = useCallback(
    (role: any) => (e: any) => {
      e.stopPropagation();
      deleteProjectRole(role.id);
    },
    [deleteProjectRole]
  );

  const renderItem = useCallback(
    ({ role }: any) => {
      return (
        <TableRow className={classes.row} key={role.id} hover>
          <TableCell component="th" scope="row">
            {get(role, 'name')}
          </TableCell>
          <TableCell align="right">
            <IconButton onClick={handleRemoveClick(role)}>
              <ClearIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    },
    [classes, handleRemoveClick]
  );

  return (
    <div className={classes.root}>
      {preparedProjectRoles && preparedProjectRoles.length ? (
        <Table items={preparedProjectRoles} renderItem={renderItem}>
          <TableHead>
            <TableRow>
              <TableCell>Роль</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
        </Table>
      ) : (
        <Grid item xs={12}>
          ...loading
        </Grid>
      )}
      <CreateForm />
    </div>
  );
};
